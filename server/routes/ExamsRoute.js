const { Router } = require('express');
const { addExam, updateExam, deleteExam, getAllExams, getExamById } = require('../controllers/ExamsController');

const router = Router();

router.post('/exam/save', addExam); 
router.get('/exam', getAllExams); 
router.get('/exam/:id', getExamById); 
router.put('/exam/:id', updateExam); 
router.delete('/exam/:id', deleteExam); 

module.exports = router;
