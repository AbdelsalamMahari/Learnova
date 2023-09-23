const { Router } = require('express');
const { saveSurveyResponses, getSurveySchema } = require('../controllers/SurveyController');

const router = Router();

router.post('/surveys/save', saveSurveyResponses);
router.get('/surveys/schema', getSurveySchema);

module.exports = router;
