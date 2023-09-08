const { Router } = require('express');
const verify = require('../verifyToken');
const { addExam, updateExam, deleteExam, getAllExams, getExamById } = require('../controllers/ExamsController');

const router = Router();

router.post('/exam/save', verify, addExam); 
router.get('/exam', verify, getAllExams); 
router.get('/exam/:id', verify, getExamById); 
router.put('/exam/:id', verify, updateExam); 
router.delete('/exam/:id', verify, deleteExam); 

module.exports = router;
