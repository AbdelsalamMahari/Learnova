const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  subtitle: { 
    type: String,
  },
  backdrop: {
    type: String,
  },
});

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  lessons: [LessonSchema],
});

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  instructor: {
    type: String,
  },
  content: [ChapterSchema],
  image: {
    type: String,
  },
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
