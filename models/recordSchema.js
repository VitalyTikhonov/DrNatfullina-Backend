const mongoose = require('mongoose');
// const validator = require('validator');

const recordEntry = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 100,
    },
    issues: {
      type: [{ type: String, minlength: 2, maxlength: 50 }],
      required: true,
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'postComment' }],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('record', recordEntry);
