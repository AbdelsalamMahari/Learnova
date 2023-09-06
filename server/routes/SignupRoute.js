const { Router } = require('express');
const { signup, link } = require('../controllers/SignupController');

const router = Router();

//Student
router.get('/:id/verify/:token/', link);
router.post('/signup/student', signup);

//Teacher

module.exports = router;