import topic from './topicSchema';
import comment from './postCommentSchema';

const mongoose = require('mongoose');
const validator = require('validator');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 5000,
  },
  publishedAtDate: {
    type: Date,
    required: true,
  },
  categories: {
    type: [topic],
    required: true,
  },
  comments: {
    type: [comment],
    required: true,
  },
  coverPhoto: {
    type: String,
    required: false,
    validate: (link) => validator.isURL(link),
  },
});
// recordId: {
//   type: mongoose.Schema.Types.ObjectId,
//   required: true,
// },

module.exports = mongoose.model('post', postSchema);
