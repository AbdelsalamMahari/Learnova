const Exam = require('../models/ExamsModel');
// Get all questions for a specific course (quiz) by courseId
module.exports.getQuizExams = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const questions = await Exam.find({ courseId }).exec();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new question
module.exports.createExam = async (req, res) => {
  try {
    const question = new Exam(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the question.' });
  }
};

// Get all questions
module.exports.getAllExams= async (req, res) => {
  try {
    const questions = await Exam.find();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching questions.' });
  }
};

// Get one question by ID
module.exports.getOneExam = async (req, res) => {
  try {
    const question = await Exam.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the question.' });
  }
};

// Update a question by ID
module.exports.updateExam = async (req, res) => {
  try {
    const question = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the question.' });
  }
};

// Delete a question by ID
module.exports.deleteExam = async (req, res) => {
  try {
    const question = await Exam.findByIdAndRemove(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json({ message: 'Question deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the question.' });
  }
};

// Get questions by course ID
module.exports.getExamsByCourseId = async (req, res) => {
  try {
    const courseId = req.params.id; // Assuming you have a route parameter for courseId

    // Use Question.find() to find questions for the specified course
    const questions = await Exam.find({ courseId: courseId});

    if (!questions || questions.length === 0) {
      return res.status(404).json({ error: 'No questions found for this course.' });
    }

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching questions for the course.' });
  }
};
