const Question = require('../models/BankQuestionsModel');

module.exports.saveQuestion = async (req, res) => {
    try {
      const courseId = req.body.courseId;
      const questionText = req.body.questionText;
      const answer = req.body.answer;
  
      let question = await Question.findOne({ courseId: courseId });
  
      if (question) {
        // Update the existing question
        question.questions.push({
          questionText: questionText,
          answer: answer,
        });
  
        try {
          question = await question.save();
          res.status(200).json(question);
        } catch (validationError) {
          res.status(400).json({ error: validationError.message });
        }
      } else {
        // Create a new question
        const newQuestion = new Question({
          courseId: courseId,
          questions: [
            {
              questionText: questionText,
              answer: answer,
            },
          ],
        });
  
        try {
          question = await newQuestion.save();
          res.status(201).json(question);
        } catch (validationError) {
          res.status(400).json({ error: validationError.message });
        }
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Get all questions
module.exports.getAllQuestion = async (req, res) => {
    try {
      const courseId = req.params.id; // Assuming you have a route parameter for courseId
  
      // Use Question.find() to find questions for the specified course
      const questions = await Question.find({ courseId: courseId });
  
      if (!questions || questions.length === 0) {
        return res.status(404).json({ error: 'No questions found for this course.' });
      }
  
      res.json(questions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching questions for the course.' });
    }
  };
  
// Update a question
module.exports.updateQuestion = async (req, res) => {
    try {
      // Extract the questionId, questionText, and answer from the request body
      const { questionId, questionText, answer } = req.body;
  
      // Extract the mainId from the URL parameters
      const { id } = req.params;
  
      // Ensure that all required fields are provided
      if (!id || !questionId || !questionText || !answer) {
        return res.status(400).json({ message: 'Missing required data.' });
      }
  
      // Update the specific question within the main record
      const result = await Question.updateOne(
        {
          _id: id,
          'questions._id': questionId,
        },
        {
          $set: {
            'questions.$.questionText': questionText,
            'questions.$.answer': answer,
          },
        }
      );
  
      if (result.nModified === 0) {
        return res.status(404).json({ message: 'Question not found.' });
      }
  
      return res.status(200).json({ message: 'Question updated successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };

  
// Delete a question
module.exports.deleteQuestion = async (req, res) => {
    try {
      const questionId = req.params.id; // Assuming this is the _id of the document
      const { questionIndex } = req.body; // Assuming you send the index or _id of the question to delete in the request body
      
      const result = await Question.updateOne(
        { _id: questionId },
        { $pull: { questions: { _id: questionIndex } } }
      );
  
      if (result.nModified === 0) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      res.json({ message: 'Question deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
