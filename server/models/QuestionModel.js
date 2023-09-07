const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    a: {
      type: Boolean,
      default: false,
    },
    b: {
      type: Boolean,
      default: false,
    },
    c: {
      type: Boolean,
      default: false,
    },
    d: {
      type: Boolean,
      default: false,
    },
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
