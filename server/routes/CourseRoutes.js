const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByUserId,
  courseBackdrop,
  getCourseBackdrop,
  getCoursesByInstructorId
} = require("../controllers/CourseController");

router.post("/courseBackdrop", courseBackdrop);
router.get("/getBackdrop/:backdropId", getCourseBackdrop);
router.post("/create", createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/update/:id", updateCourse);
router.delete("/delete/:id", deleteCourse);
router.get("/instructor/:id", getCoursesByUserId);
router.get("/instructor/:instructorId/courses", getCoursesByInstructorId); // New route for getting courses by instructor ID


module.exports = router;
