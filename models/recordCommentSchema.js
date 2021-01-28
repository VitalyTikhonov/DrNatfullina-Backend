const mongoose = require('mongoose');

const recordCommentSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true },
);

module.exports = mongoose.model('recordComment', recordCommentSchema);
