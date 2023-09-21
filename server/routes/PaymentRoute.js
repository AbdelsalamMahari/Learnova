const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");

router.post("/payment", paymentController.makePayment);

module.exports = router;
