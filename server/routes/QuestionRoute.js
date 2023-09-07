const { Router } = require('express');
const {  createQuestion,getAllQuestions,getOneQuestion,updateQuestion,deleteQuestion} = require('../controllers/QuestionController');

const router = Router();
// Create a new question
router.post('/add/questions', createQuestion);

// Get all questions
router.get('/get/questions', getAllQuestions);

// Get one question by ID
router.get('/get/questions/:id', getOneQuestion);

// Update a question by ID
router.put('/update/questions/:id', updateQuestion);

// Delete a question by ID
router.delete('/delete/questions/:id',deleteQuestion);

module.exports = router;