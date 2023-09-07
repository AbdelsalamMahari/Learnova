const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam', // Reference to the Exam model
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  // Add other relevant fields like timestamp, feedback, etc.
});

const ExamResult = mongoose.model('ExamResult', examResultSchema);

module.exports = ExamResult;
