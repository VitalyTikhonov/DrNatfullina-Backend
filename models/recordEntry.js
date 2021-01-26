import healthIssue from './healthIssueSchema';
import comment from './recordCommentSchema';

const mongoose = require('mongoose');
// const validator = require('validator');

const recordEntry = new mongoose.Schema({
  userId: {
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
    type: [healthIssue],
    required: true,
  },
  comments: {
    type: [comment],
    required: true,
  },
});
// recordId: {
//   type: mongoose.Schema.Types.ObjectId,
//   required: true,
// },

module.exports = mongoose.model('record', recordEntry);
