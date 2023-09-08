const { Schema, model } = require("mongoose");

const FeedbackSchema = new Schema({
  studentId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isAddedToSlider: { type: Boolean, default: false }, // Default value added
});

module.exports = model("feedbacks", FeedbackSchema);
