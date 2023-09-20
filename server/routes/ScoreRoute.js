// routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const { getUserScore, updateUserScore } = require('../controllers/scoreController');

// Get user's score for a specific course
router.get('/:userId/score/:courseId', getUserScore);

// Update user's score for a specific course
router.put('/:userId/score/:courseId', updateUserScore);

module.exports = router;
