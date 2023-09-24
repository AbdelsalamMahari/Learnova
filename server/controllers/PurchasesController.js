const Purchase = require("../models/PurchasesModel");

// Create a new purchase
  module.exports.createPurchase = async (req, res) => {
    try {
      const { userId, courseId, amount } = req.body;
  
      // Create a new subscription record
      const purchase = new Purchase({ userId, courseId, amount });
      await purchase.save();
  
      res.status(201).json({ message: "purchase created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };

  module.exports.checkIfPurchased = async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      const purchase = await Purchase.findOne({ userId, courseId });
  
      if (purchase) {
        // The user has purchased the course
        res.status(200).json({ hasPurchased: true });
      } else {
        // The user has not purchased the course
        res.status(200).json({ hasPurchased: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };