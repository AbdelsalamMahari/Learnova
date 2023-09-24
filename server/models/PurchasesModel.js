const { Schema, model } = require("mongoose");

const purchaseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  courseId: { type: Schema.Types.ObjectId, required: true, ref: "Course" }, 
  amount: { type: Number, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

const Purchase = model("purchase", purchaseSchema);

module.exports = Purchase;
