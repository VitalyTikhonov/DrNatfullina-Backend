const mongoose = require('mongoose');
const comment = require('./postCommentSchema').schema;
// const validator = require('validator');

const recordEntry = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    date: {
      type: Date,
      required: false,
    },
    location: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 100,
    },
    issues: {
      type: [String],
      required: true,
    },
    comments: {
      type: [comment],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('record', recordEntry);
