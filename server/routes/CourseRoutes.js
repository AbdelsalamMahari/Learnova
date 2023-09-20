const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByUserId,
} = require("../controllers/CourseController");


router.post("/create", createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/update/:id", updateCourse);
router.delete("/delete/:id", deleteCourse);
router.get("/instructor/:id", getCoursesByUserId);

module.exports = router;
