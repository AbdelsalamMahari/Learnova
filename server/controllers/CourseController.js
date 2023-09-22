const Course = require("../models/CourseModel");
const Question = require("../models/QuestionModel");


const createCourse = async (req, res) => {
  try {
    const { name, description, content, instructor } = req.body;
    const mappedContent = content.map((chapter) => ({
      title: chapter.title,
   
      lessons: chapter.lessons.map((lesson) => ({
        content: lesson.content,
        image: lesson.image,
        subtitle: lesson.subtitle, 
      })),
    }));

    const course = new Course({
      name,
      description,
      instructor,
      content: mappedContent,
    });

    await course.save();

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find and delete all questions associated with the course
    await Question.deleteMany({ courseId });

    // Then, delete the course
    const course = await Course.findByIdAndRemove(courseId);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course and associated questions deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCoursesByUserId = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you have a route parameter for userId
    // Use Course.find() to find courses for the specified user by instructor field
    const courses = await Course.find({ instructor: userId });
 
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found for this user" });
    }

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByUserId,
};
