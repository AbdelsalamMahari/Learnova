const { Router } = require('express');
const { sendPassLink, verifyPass, setNewPass } = require('../controllers/ForgetPassController');

const router = Router();

router.post('/forget-pass/', sendPassLink); 
router.get('/forget-pass/:id/:token', verifyPass); 
router.post('/forget-pass/:id/:token', setNewPass); 

module.exports = router;
