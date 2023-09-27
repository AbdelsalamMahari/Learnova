const Purchase = require("../models/PurchasesModel");
const Course = require("../models/CourseModel");
const InstructorBalance = require("../models/InstructorBalanceModel");
const Balance = require("../models/BalanceModel");
const { User } = require("../models/UsersModel");
const sendEmail = require("../utils/sendEmail");
const { emailPurchase } = require("../utils/templates/EmailPurchase");

// Create a new purchase
module.exports.createPurchase = async (req, res) => {
  try {
    const { userId, courseId, amount } = req.body;

    // Create a new subscription record
    const purchase = new Purchase({ userId, courseId, amount });
    await purchase.save();

    // Fetch the course to get the instructor's ID and course name
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

    // Send an email to the user thanking them for the purchase
    const user = await User.findById(userId);
    if (user) {
      const emailHtml = emailPurchase(user, course);

      await sendEmail(user.email, "Thank You for Your Purchase", emailHtml);
    }

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

  module.exports.getAllPurchases = async (req, res) => {
      try {
        // Fetch all purchase records
        const purchases = await Purchase.find({});
    
        // Create an array to store formatted purchase data
        const formattedPurchases = [];
    
        // Iterate through the purchase records and fetch related data
        for (const purchase of purchases) {
          const user = await User.findById(purchase.userId); // Fetch user information
          const course = await Course.findById(purchase.courseId); // Fetch course information
    
          if (user && course) {
            // If both user and course data are available, format the purchase data
            const formattedPurchase = {
              firstName: user.firstName,
              lastName: user.lastName,
              courseName: course.name,
              amount: purchase.amount,
            };
            formattedPurchases.push(formattedPurchase);
          }
        }
    
        res.status(200).json(formattedPurchases);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching purchases with user information" });
      
  };
}
  