const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
  plan: { type: String, required: true }, // 'monthly' or 'annual'
  amount: { type: Number, required: true }, // Amount in cents
  createdAt: { type: Date, default: Date.now },
  
});

const Subscription = model("Subscription", subscriptionSchema);

module.exports = Subscription;
