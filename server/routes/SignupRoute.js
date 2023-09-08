const { Router } = require('express');
const { signupStudent, signupTeacher, linkStudent, linkTeacher } = require('../controllers/SignupController');

const router = Router();

//Student
router.get('/students/:id/verify/:token/', linkStudent);
router.post('/signup/student', signupStudent);

//Teacher
router.get('/teachers/:id/verify/:token/', linkTeacher);
router.post('/signup/teacher', signupTeacher);

module.exports = router;