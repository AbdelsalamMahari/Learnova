const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
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
  ]
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
