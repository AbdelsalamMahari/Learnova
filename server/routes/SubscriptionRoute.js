const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/SubscriptionController");

// Create a new subscription
router.post("/subscriptions", subscriptionController.createSubscription);

router.get("/subscriptions/total", subscriptionController.getTotalSubscriptionAmount);

router.get("/subscriptions/:id", subscriptionController.getUserSubscriptionPlan);


module.exports = router;
