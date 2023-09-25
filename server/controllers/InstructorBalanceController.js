const Instructor = require("../models/InstructorBalanceModel");
const Balance = require("../models/BalanceModel");

// Get the balance of a specific instructor
module.exports.getInstructorBalance = async (req, res) => {
  try {
    const instructorId = req.params.id;

    // Find the instructor balance record by their instructorId
    const instructorBalance = await Instructor.findOne({
      instructorId: instructorId,
    });

    if (!instructorBalance) {
      return res.status(404).json({ error: "Instructor balance not found" });
    }

    // Return the instructor's balance
    res.status(200).json({ balance: instructorBalance.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getGeneralBalance = async (req, res) => {
    try {
      // Find or create a general balance record
      let generalBalance = await Balance.findOne({}); // Assuming there's only one general balance record
  
      if (!generalBalance) {
        return res.status(404).json({ error: "General balance not found" });
      }
  
      // Return the general balance
      res.status(200).json({ balance: generalBalance.balance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };