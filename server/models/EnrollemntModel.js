const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', 
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  completedChapters: {
    type: [String], 
    default: [], 
  },
  
  grade: {
    type: Number,
    min: 0,
    max: 100,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', 
    required: true,
  },
  completedPercentage:{
    type :Number ,
    default:0,
  }
  
});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

module.exports = Enrollment; 