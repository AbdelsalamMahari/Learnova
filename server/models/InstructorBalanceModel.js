const { Schema, model } = require("mongoose");

const instructorSchema = new Schema({
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  balance: { type: Number },
});

const Instructor = model("InstructorBalance", instructorSchema);

module.exports = Instructor;