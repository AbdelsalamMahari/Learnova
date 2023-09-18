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

// Fetch user subscriptions
module.exports.getUserSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find subscriptions for the given user
    const subscriptions = await Subscription.find({ userId });

    res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
