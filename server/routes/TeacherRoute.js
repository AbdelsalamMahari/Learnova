const { Router } = require('express');
const {updateTeacher,deleteTeacher,getTeacherById,getAllTeachers,} = require("../controllers/TeacherController");
const router = Router();

router.put("/update/:id", updateTeacher);

router.delete("/:id", deleteTeacher);

router.get("/teachers", getAllTeachers);

router.get("/:id", getTeacherById);

module.exports = router;
