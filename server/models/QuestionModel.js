const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      text: String,
      isTrue: Boolean,
    },
    {
      text: String,
      isTrue: Boolean,
    },
    {
      text: String,
      isTrue: Boolean,
    },
    {
      text: String,
      isTrue: Boolean,
    },
  ],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
