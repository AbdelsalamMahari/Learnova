const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");

router.post("/payment", paymentController.makePayment);
router.post("/payment/subscription", paymentController.makeSubscriptionPayment);

module.exports = router;
