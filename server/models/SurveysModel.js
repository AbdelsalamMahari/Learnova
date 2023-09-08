const { Schema, model } = require("mongoose");

const AnswerSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

const QuestionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  answers: [AnswerSchema],
});

const SurveySchema = new Schema({
  surveyName: {
    type: String,
    required: true,
  },
  surveyDescription: String,
  courseID: {
    type: Schema.Types.ObjectId,
    ref: "Course", // Reference to the Course model
    required: true,
  },
  questions: [QuestionSchema], // An array of questions with answers
  surveyStartDate: {
    type: Date,
    required: true,
  },
  surveyEndDate: {
    type: Date,
    required: true,
  },
  surveyCreator: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (for the creator)
    required: true,
  },
});

module.exports = model("Surveys", SurveySchema);
