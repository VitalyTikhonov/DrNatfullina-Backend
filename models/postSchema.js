const mongoose = require('mongoose');
const validator = require('validator');
const comment = require('./postCommentSchema').schema;

const postSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 300,
    },
    text: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20000,
    },
    categories: {
      type: [String],
      required: true,
    },
    coverPhoto: {
      type: String,
      required: false,
      validate: (link) => validator.isURL(link),
    },
    comments: {
      type: [comment],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('post', postSchema);
