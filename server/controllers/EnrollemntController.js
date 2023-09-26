const  Enrollment  = require("../models/EnrollemntModel");

module.exports.createEnrollment = async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while creating the enrollment." });
  }
};

module.exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching enrollments." });
  }
};

// Get one enrollment by ID
module.exports.getOneEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found." });
    }
    res.json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching the enrollment." });
  }
};

// Update an enrollment by ID
module.exports.updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found." });
    }
    res.json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while updating the enrollment." });
  }
};

// Delete an enrollment by ID
module.exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndRemove(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found." });
    }
    res.json({ message: "Enrollment deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while deleting the enrollment." });
  }
};
