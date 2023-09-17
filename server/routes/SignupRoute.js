const { Router } = require('express');
const { signup, link } = require('../controllers/SignupController');

const router = Router();

router.get('/users/:id/verify/:token/', link);
router.post('/signup', signup);


module.exports = router;