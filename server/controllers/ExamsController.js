const Exam = require('../models/ExamsModel');

// Controller to add a new exam
module.exports.addExam = async (req, res) => {
  try {
    if (!req.user.isIntructor) {
      return res.status(403).json({ error: 'You are not allowed to create exams.' });
    }

    const { name, course, questions } = req.body;

    const exam = new Exam({
      name,
      course,
      questions,
    });

    await exam.save();

    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the exam' });
  }
};

// Controller to update an exam
module.exports.updateExam = async (req, res) => {
  try {
    if (!req.user.isIntructor) {
      return res.status(403).json({ error: 'You are not allowed to update exams.' });
    }

    const updatedExam = await Exam.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.status(200).json({ message: "Exam updated successfully", exam: updatedExam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete an exam
module.exports.deleteExam = async (req, res) => {
  try {
    if (!req.user.isIntructor) {
      return res.status(403).json({ error: 'You are not allowed to delete exams.' });
    }

    const examId = req.params.id;

    const deletedExam = await Exam.findByIdAndDelete(examId);

    if (!deletedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.status(200).json({ message: "Exam deleted successfully", exam: deletedExam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all exams
module.exports.getAllExams = async (req, res) => {
  try {
    if (!req.user.isIntructor) {
      return res.status(403).json({ error: 'You are not allowed to see all exams.' });
    }
    const exams = await Exam.find();

    res.status(200).json({ message: 'All exams retrieved successfully', exams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching exams' });
  }
};

// Controller to get a single exam by ID
module.exports.getExamById = async (req, res) => {
  try {
    const examId = req.params.id;

    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.status(200).json({ message: 'Exam retrieved successfully', exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
