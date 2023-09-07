const { Router } = require('express');
const { loginTeacher, loginStudent } = require('../controllers/LoginController');

const router = Router();

//Student
router.post('/login/student', loginStudent);

//Teacher
router.post('/login/teacher', loginTeacher);


module.exports = router;