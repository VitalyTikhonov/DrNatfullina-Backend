const mongoose = require('mongoose');

const recordCommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'record',
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

module.exports = mongoose.model('recordComment', recordCommentSchema);
