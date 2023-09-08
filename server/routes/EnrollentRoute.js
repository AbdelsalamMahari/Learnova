const { Router } = require("express");
const {  createEnrollment,getAllEnrollments,getOneEnrollment,updateEnrollment,deleteEnrollment} = require('../controllers/EnrollemntController');

const router = Router();

// Create a new enrollment
router.post("/add/enrollemnt", createEnrollment);

// Get all enrollments
router.get("/get/enrollemnt", getAllEnrollments);

// Get one enrollment by ID
router.get("/get/enrollemnt/:id", getOneEnrollment);

// Update an enrollment by ID
router.put("/update/enrollemnt/:id", updateEnrollment);

// Delete an enrollment by ID
router.delete("/delete/enrollemnt/:id", deleteEnrollment);

module.exports = router;
