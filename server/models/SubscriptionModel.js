const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
  instructorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  amount: { type: Number, required: true }, // Amount in cents
  subscribed: {
    type: Boolean,
    default: true, // Default to true, assuming they are subscribed when a subscription record is created
  },
  createdAt: { type: Date, default: Date.now },
});

const Subscription = model("Subscription", subscriptionSchema);

module.exports = Subscription;
