const mongoose = require('mongoose');

const bankQuestionSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

const Question = mongoose.model('banckQuestion', bankQuestionSchema);

module.exports = Question;