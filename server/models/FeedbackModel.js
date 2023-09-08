const { Schema, model } = require("mongoose");

const FeedbackSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "student", // Reference to the "student" model
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isAddedToSlider: { type: Boolean, default: false }, // Default value added
});

module.exports = model("feedbacks", FeedbackSchema);
