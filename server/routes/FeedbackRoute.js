const { Router } = require('express');
const { getAllFeedbacks,submitFeedback,deleteFeedback,updateSliderStatus, getSlider4Feedbacks } = require('../controllers/FeedbackController');

const router = Router();

router.get('/feedbacks', getAllFeedbacks);
router.get('/feedbacks/home', getSlider4Feedbacks);
router.post('/feedbacks/save', submitFeedback);
router.delete('/feedbacks/:id', deleteFeedback);
router.put('/feedbacks/:id', updateSliderStatus);



module.exports = router;