const mongoose = require('mongoose');

const postCommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
    required: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000,
  },
  threadType: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  publishedAtDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('postComment', postCommentSchema);
