const { Router } = require('express');
const { saveQuestion, getAllQuestion, updateQuestion, deleteQuestion } = require('../controllers/BankQuestionController');

const router = Router();

router.post('/bank/save', saveQuestion);
router.get('/bank/getAllQuestion/:id', getAllQuestion);
router.put('/bank/updateQuestion/:id', updateQuestion);
router.delete('/bank/deleteQuestion/:id', deleteQuestion);

module.exports = router;