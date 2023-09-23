const { Router } = require('express');
const verify = require('../verifyToken');
const { updateUser, deleteUser, getUser, getAllUser, statUser, updatePassword, profile, getAllInstructors, getStudents, getInstructors, getProfilePhoto } = require('../controllers/UsersController');
const { cv, getCv } = require('../controllers/CvController');
const router = Router();

router.put('/users/:id', verify, updateUser);
router.put('/users/newpass/:id', verify, updatePassword);
router.delete('/users/:id', verify, deleteUser);
router.get('/users/find/:id', getUser );
router.get('/users', verify, getAllUser );
router.get('/users/stats', verify, statUser );
router.post('/users/profile/:id', profile );
router.get('/users/role/instructor', verify, getAllInstructors );
router.get('/users/allInstructor', verify, getInstructors );
router.get('/users/allStudents', verify, getStudents );
router.get('/users/userProfile/:profilePhotoID', getProfilePhoto );
router.post('/users/cv/:id', cv );
router.get('/users/userCv/:cvId', getCv );

module.exports = router;
