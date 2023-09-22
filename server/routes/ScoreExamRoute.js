// routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const { getUserExamScore, updateUserExamScore } = require('../controllers/ScoreExamController');

// Get user's score for a specific course
router.get('/:userId/examScore/:courseId', getUserExamScore);

// Update user's score for a specific course
router.put('/:userId/examScore/:courseId', updateUserExamScore);

module.exports = router;
