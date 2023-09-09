const express = require("express");
const router = express.Router();
const {updateTeacher,deleteTeacher,getTeacherById,getAllTeachers,} = require("../controllers/TeacherController");

router.put("/update/:id", updateTeacher);

router.delete("/:id", deleteTeacher);

router.get("/:id", getTeacherById);

router.get("/", getAllTeachers);

module.exports = router;
