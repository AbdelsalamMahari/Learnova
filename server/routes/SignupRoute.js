const { Router } = require('express');
const { signupStudent, signupTeacher, link } = require('../controllers/SignupController');

const router = Router();

//Student
router.get('/:id/verify/:token/', link);
router.post('/signup/student', signupStudent);

//Teacher
router.get('/:id/verify/:token/', link);
router.post('/signup/teacher', signupTeacher);

module.exports = router;