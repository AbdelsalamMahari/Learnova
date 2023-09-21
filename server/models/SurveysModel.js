const { Schema, model } = require('mongoose');

const SurveySchema = new Schema({
  question1: {
    average: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },
  question2: {
    average: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },
  question3: {
    average: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },
  question4: {
    average: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },
  question5: {
    average: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },
});

module.exports = model('Survey', SurveySchema);
