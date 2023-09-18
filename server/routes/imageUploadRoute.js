const express = require('express');
const router = express.Router();
const ImageUploadController = require('../controllers/imageUploadController');

router.post('/upload', ImageUploadController.uploadFile);

module.exports = router;
