const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Replace 'Course' with the actual name of your Course model
    required: true,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],
  // Add other exam-related fields as needed
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
