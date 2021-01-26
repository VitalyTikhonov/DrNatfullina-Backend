const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('topic', topicSchema);
