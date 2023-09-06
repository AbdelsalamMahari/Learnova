const { Router } = require('express');
const { signup, link } = require('../controllers/SignupController');

const router = Router();

router.get('/:id/verify/:token/', link);
router.post('/signup/student', signup);


module.exports = router;