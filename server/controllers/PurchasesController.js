const Purchase = require("../models/PurchasesModel");
const Course = require("../models/CourseModel");
const InstructorBalance = require("../models/InstructorBalanceModel");
const Balance = require("../models/BalanceModel"); // Import the Balance model

// Create a new purchase
module.exports.createPurchase = async (req, res) => {
  try {
    const { userId, courseId, amount } = req.body;

    // Create a new subscription record
    const purchase = new Purchase({ userId, courseId, amount });
    await purchase.save();

    // Fetch the course to get the instructor's ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Calculate the amount for the instructor (50%)
    const instructorAmount = amount * 0.5;

    // Find the instructor balance record by their instructorId
    let instructorBalance = await InstructorBalance.findOne({
      instructorId: course.instructor,
    });

    // If the instructor balance record doesn't exist, create one
    if (!instructorBalance) {
      instructorBalance = new InstructorBalance({
        instructorId: course.instructor,
        balance: 0, // Set an initial balance if needed
      });
    }

    // Update the instructor's balance
    instructorBalance.balance += instructorAmount;
    await instructorBalance.save();

    // Calculate the remaining 50% for the general balance
    const remainingAmount = amount - instructorAmount;

    // Find or create a general balance record
    let generalBalance = await Balance.findOne({}); // Assuming there's only one general balance record

    if (!generalBalance) {
      generalBalance = new Balance({
        balance: 0, // Set an initial balance if needed
      });
    }

    // Update the general balance with the remaining amount
    generalBalance.balance += remainingAmount;
    await generalBalance.save();

    res.status(201).json({ message: "Purchase created successfully" });
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