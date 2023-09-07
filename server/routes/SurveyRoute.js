const { Router } = require('express');
const { createSurvey, getAllSurveys, deleteSurveyById, updateSurveyById, getSurveyById } = require('../controllers/SurveyController');

const router = Router();

router.post('/surveys/save', createSurvey); // Create a new survey
router.get('/surveys', getAllSurveys); // Get all surveys
router.get('/surveys/:id', getSurveyById); // Get a survey by ID
router.put('/surveys/update/:id', updateSurveyById); // Update a survey by ID
router.delete('/survey/:id', deleteSurveyById); // Delete a survey by ID

module.exports = router;
