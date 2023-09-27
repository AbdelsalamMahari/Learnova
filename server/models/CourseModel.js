const { boolean } = require("joi");
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
  backdrop: {
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
  Price:{
    type: Number,

  },
  category:{
    type :String ,
  },
  deployable:{
    type:Boolean,
    default:false
  }
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
