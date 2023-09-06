const { Router } = require('express');
const { login } = require('../controllers/LoginController');

const router = Router();

//Student
router.post('/login/student', login);

//Teacher

module.exports = router;