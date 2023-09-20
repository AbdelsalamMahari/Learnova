// controllers/scoreController.js
const Score = require('../models/scoreModel');

// Get user's score for a specific course
module.exports.getUserScore = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const score = await Score.findOne({ userId, courseId }).exec();

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

// Update user's score for a specific course
module.exports.updateUserScore = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const { score } = req.body;

    let userScore = await Score.findOne({ userId, courseId });

    if (!userScore) {
      userScore = new Score({
        userId,
        courseId,
        score,
      });
    } else {
      userScore.score = score;
    }

    await userScore.save();

    res.json({ message: 'User score updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
