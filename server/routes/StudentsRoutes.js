const { Router } = require('express');
const verify = require('../verifyToken');
const { updateStudent, deleteStudent, getStudent, getAllStudent, statStudent, updatePassword } = require('../controllers/StudentsController');

const router = Router();

router.put('/students/:id', verify, updateStudent);
router.put('/students/newpass/:id', verify, updatePassword);
router.delete('/students/:id', verify, deleteStudent);
router.get('/students/find/:id', getStudent );
router.get('/students', verify, getAllStudent );
router.get('/students/stats', verify, statStudent );

module.exports = router;
