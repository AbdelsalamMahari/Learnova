const express = require("express");
const router = express.Router();
const verify = require("../verifyToken");
const {
  updateTeacher,
  deleteTeacher,
  getTeacherById,
  getAllTeachers,
} = require("../controllers/TeacherController");

router.put("/teacher/update/:id", verify, updateTeacher);

router.delete("/teacher/:id", verify, deleteTeacher);

router.get("/teacher/:id", getTeacherById);

router.get("/teacher", verify, getAllTeachers);

module.exports = router;
