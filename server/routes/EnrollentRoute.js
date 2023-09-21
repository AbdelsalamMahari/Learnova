const { Router } = require("express");
const {  createEnrollment,getAllEnrollments,getOneEnrollment,updateEnrollment,deleteEnrollment} = require('../controllers/EnrollemntController');

const router = Router();

// Create a new enrollment
router.post("/add/enrollement", createEnrollment);

// Get all enrollments
router.get("/get/enrollement", getAllEnrollments);

// Get one enrollment by ID
router.get("/get/enrollement/:id", getOneEnrollment);

// Update an enrollment by ID
router.put("/update/enrollement/:id", updateEnrollment);

// Delete an enrollment by ID
router.delete("/delete/enrollement/:id", deleteEnrollment);

module.exports = router;
