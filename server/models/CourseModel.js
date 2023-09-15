const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  lessons: [LessonSchema],
});

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  content: [ChapterSchema],
  image: {
    type: String, 
    required: true,
  },
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
