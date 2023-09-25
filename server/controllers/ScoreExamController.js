// controllers/scoreController.js
const ExamScore = require('../models/ScoreExamModel');

// Get user's score for a specific course
module.exports.getUserExamScore = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const score = await ExamScore.findOne({ userId, courseId }).exec();

    if (!score) {
      // If no score exists, return 0 as the default score
      res.json({ score: 0 });
    } else {
      res.json({ score: score.score });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user's score and set completed status based on the score
module.exports.updateUserExamScore = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const { score } = req.body;

    let userScore = await ExamScore.findOne({ userId, courseId });

    if (!userScore) {
      userScore = new ExamScore({
        userId,
        courseId,
        score,
        completed: score >= 50, // Set completed to true if score >= 50, otherwise false
      });
    } else {
      userScore.score = score;
      userScore.completed = score >= 50; // Update completed status based on the score
    }

    await userScore.save();

    res.json({ message: 'User score and completed status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user's score for a specific course
module.exports.deleteUserExamScore = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    
    // Find and delete the user's score
    await ExamScore.findOneAndDelete({ userId, courseId }).exec();

    res.json({ message: 'User score deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

