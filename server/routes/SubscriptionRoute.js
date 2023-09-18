const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/SubscriptionController");

// Create a new subscription
router.post("/subscriptions", subscriptionController.createSubscription);

// Fetch user subscriptions by userId
router.get("/subscriptions/:userId", subscriptionController.getUserSubscriptions);

module.exports = router;
