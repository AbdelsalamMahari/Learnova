const Subscription = require("../models/SubscriptionModel");

// Create a new subscription
module.exports.createSubscription = async (req, res) => {
  try {
    const { userId, plan, amount } = req.body;

    // Create a new subscription record
    const subscription = new Subscription({ userId, plan, amount });
    await subscription.save();

    res.status(201).json({ message: "Subscription created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get the total amount of subscriptions for all users
module.exports.getTotalSubscriptionAmount = async (req, res) => {
  try {
    // Find all subscriptions
    const subscriptions = await Subscription.find();

    // Calculate the total amount
    let totalAmount = 0;
    for (const subscription of subscriptions) {
      totalAmount += subscription.amount/100;
    }

    totalAmount = totalAmount.toFixed(2);

    res.status(200).json({ totalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
