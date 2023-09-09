const express = require("express");
const router = express.Router();
const {updateTeacher,deleteTeacher,getTeacherById,getAllTeachers,
} = require("../controllers/TeacherController");

// Update a teacher
router.put("/update/:id", updateTeacher);

// Delete a teacher
router.delete("/:id", deleteTeacher);

// Get a teacher's own information
router.get("/:id", getTeacherById);

// Get all teachers (only for admins)
router.get("/", getAllTeachers);

module.exports = router;
