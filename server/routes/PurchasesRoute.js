const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/PurchasesController");

router.post("/purchases/create", purchaseController.createPurchase);
router.post("/purchases/check", purchaseController.checkIfPurchased);


module.exports = router;
