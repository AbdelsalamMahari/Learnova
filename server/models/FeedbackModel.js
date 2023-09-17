const { Schema, model } = require("mongoose");

const FeedbackSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user", // Reference to the "student" model
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isAddedToSlider: { type: Boolean, default: false }, // Default value added
});

module.exports = model("feedbacks", FeedbackSchema);
