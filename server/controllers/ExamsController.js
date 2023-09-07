const Exam = require('../models/ExamsModel');

// Controller to add a new exam
module.exports.addExam = async (req, res) => {
  try {
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

  //update
  module.exports.updateExam = async (req, res) => {
    try {
      const updatedExam = await Exam.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
  
      res.status(200).json({ message: "Exam updated successfully", exam: updatedExam });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //delete
  module.exports.deleteExam = async (req, res) => {
    try {
      const examId = req.params.id;
  
      // Find the exam by its ID and delete it
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
  