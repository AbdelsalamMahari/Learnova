// models/ScoreModel.js
const mongoose = require('mongoose');

const scoreExamSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', required: true }, // Assuming 'User' is the name of your user model
  courseId: { type: mongoose.Schema.Types.ObjectId,
     ref: 'Course',
      required: true },     // Assuming 'Course' is the name of your course model


  score: { type: Number,
     default: 0 },
});

const ScoreExam = mongoose.model('ScoreExam', scoreExamSchema);

module.exports = ScoreExam;
