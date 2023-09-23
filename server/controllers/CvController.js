const { User } = require('../models/UsersModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/cv');
    },
    filename: function (req, file, cb) {
      cb(null,  file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  module.exports.cv = (req, res) => {
    upload.single('cv')(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).send('cv upload failed.');
      }
  
      if (!req.file) {
        return res.status(400).send('No cv uploaded.');
      }
  
      try {
        const user = await User.findById(req.params.id);
  
        user.cv = req.file.originalname;
  
        await user.save();
  
        return res.status(200).json('File uploaded successfully.');
      } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error.');
      }
    });
  };

  module.exports.cvNoId = (req, res) => {
    upload.single('cv')(req, res, (err) => {
      if (err) {
        console.log(err)
        return res.status(400).send('Cv upload failed.');
      
      }
  
      if (!req.file) {
        return res.status(400).send('No cv uploaded.');
      }
  
          // Return the file name in the response
          return res.status(200).json('Cv uploaded successfully.');
    });
  };
  
  module.exports.getCv = async (req, res) => {
    try {
      const cv = await User.findById(req.params.cvId);
      if (!cv) {
        return res.status(404).json({ error: 'cv not found.' });
      }
  
      const relativeImagePath = cv.cv;
  
      const absoluteImagePath = path.join(__dirname, '..', '..', 'client', 'public', 'cv', relativeImagePath);
  
      
      if (!fs.existsSync(absoluteImagePath)) {
        return res.status(404).json({ error: 'File not found.', imagePath: absoluteImagePath });
      }
  
      
      res.sendFile(absoluteImagePath);
    } catch (err) {
      
      console.error('Error retrieving certificateUpload photo:', err);
  
      
      res.status(500).json({ error: 'Internal Server Error', errorMessage: err.message });
    }
  };