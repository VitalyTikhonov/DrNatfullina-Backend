const mongoose = require('mongoose');

const healthIssueSchema = new mongoose.Schema({
  healthIssue: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
});

module.exports = mongoose.model('healthIssue', healthIssueSchema);
