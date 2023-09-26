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
  updateDeployable,
} = require("../controllers/CourseController");

router.post("/courseBackdrop", courseBackdrop);
router.get("/getBackdrop/:backdropId", getCourseBackdrop);
router.post("/create", createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/update/:id", updateCourse);
router.delete("/delete/:id", deleteCourse);
router.get("/instructor/:id", getCoursesByUserId);
router.put("/update-deployable/:id", updateDeployable);
module.exports = router;
