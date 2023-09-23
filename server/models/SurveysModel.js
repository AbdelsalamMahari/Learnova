const { Schema, model } = require('mongoose');

const SurveySchema = new Schema({
  userId: {
    type: String, // Assuming userId is a string
    required: true
  },
  responses: [
    {
      questionId: { type: Number, required: true },
      rating: { type: Number, required: true }
    }
  ]
});

module.exports = model('Survey', SurveySchema);
