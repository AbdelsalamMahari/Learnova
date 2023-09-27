// routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const { getUserExamScore, updateUserExamScore, deleteUserExamScore,getExamScoresCountGreaterThanEqual50ByCourseId } = require('../controllers/ScoreExamController');

// Get user's score for a specific course
router.get('/:userId/examScore/:courseId', getUserExamScore);

// Update user's score for a specific course
router.put('/:userId/examScore/:courseId', updateUserExamScore);

// Delete user's score for a specific course
router.delete('/:userId/examScore/:courseId', deleteUserExamScore);

router.get('/countScores/:courseId', getExamScoresCountGreaterThanEqual50ByCourseId);


module.exports = router;
