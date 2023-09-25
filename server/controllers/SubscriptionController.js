const Subscription = require("../models/SubscriptionModel");

// Create a new subscription
module.exports.createSubscription = async (req, res) => {
  try {
    const { instructorId, amount } = req.body;

    // Check if there is an existing subscription for this instructor
    const existingSubscription = await Subscription.findOne({ instructorId });

    if (existingSubscription) {
      // If there's an existing subscription, update it
      existingSubscription.amount = amount;
      await existingSubscription.save();
    } else {
      // If there's no existing subscription, create a new one
      const subscription = new Subscription({ instructorId, amount });
      await subscription.save();
    }

    res.status(201).json({ message: "Subscription created/updated successfully" });
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