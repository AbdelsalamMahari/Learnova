const { Router } = require('express');
const verify = require('../verifyToken');
const { updateUser, deleteUser, getUser, getAllUser, statUser, updatePassword, profile, getAllInstructors, getStudents, getInstructors } = require('../controllers/UsersController');

const router = Router();

router.put('/users/:id', verify, updateUser);
router.put('/users/newpass/:id', verify, updatePassword);
router.delete('/users/:id', verify, deleteUser);
router.get('/users/find/:id', getUser );
router.get('/users', verify, getAllUser );
router.get('/users/stats', verify, statUser );
router.post('/users/profile', profile );
router.get('/users/role/instructor', verify, getAllInstructors );
router.get('/users/allInstructor', getInstructors );
router.get('/users/allStudents', verify, getStudents );

module.exports = router;
