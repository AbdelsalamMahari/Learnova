const  Enrollment  = require("../models/EnrollemntModel");
const Course = require("../models/CourseModel");
const User = require("../models/UsersModel").User;

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


module.exports.getEnrollmentsByInstructorId = async (req, res) => {
  try {
    const instructorId = req.params.instructorId;

    // Find all enrollments with the given instructorId
    const enrollments = await Enrollment.find({ instructor: instructorId });

    // Prepare an array to store the enrollment details with associated user and course info
    const enrollmentDetails = [];

    // Iterate through each enrollment and fetch associated user and course information
    for (const enrollment of enrollments) {
      const user = await User.findById(enrollment.user);
      const instructor = await User.findById(enrollment.instructor);
      const course = await Course.findById(enrollment.course);

      if (user && course) {
        enrollmentDetails.push({
          _id: enrollment._id,
          userId: enrollment.user,
          instructorId: enrollment.instructor,
          courseId: enrollment.course,
          user: user,
          instructor: instructor,
          course: course,
          enrollmentStatus: enrollment.enrollmentStatus,
          completionStatus: enrollment.completionStatus,
          completedChapters: enrollment.completedChapters,
          completedPercentage:enrollment.completedPercentage,
          grade: enrollment.grade,
          // Add more fields as needed
        });
      }
    }

    if (enrollmentDetails.length === 0) {
      return res.status(404).json({ message: "No enrollments found for this instructor" });
    }

    res.json(enrollmentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", errorMessage: error.message });
  }
};
