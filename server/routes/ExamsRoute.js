const { Router } = require('express');
const {  createExam,getAllExams,getOneExam,updateExam,deleteExam,
getExamsByCourseId,getQuizExams} = require('../controllers/ExamsController');

const router = Router();
// Create a new question
router.post('/add/exams', createExam);

// Get all questions
router.get('/get/exams', getAllExams);

// Get one question by ID
router.get('/get/exams/:id', getOneExam);

// Update a question by ID
router.put('/update/exams/:id', updateExam);

// Delete a question by ID
router.delete('/delete/exams/:id',deleteExam);

router.get('/exams/course/:id',getExamsByCourseId);

router.get('/:courseId/exams',getQuizExams);
module.exports = router;