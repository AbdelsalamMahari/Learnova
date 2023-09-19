const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/assets/courseimages');
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname);
  },
});

const upload = multer({ storage });

const uploadFile = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.log(err)
      return res.status(400).send('File upload failed.');
    
    }

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    return res.status(200).send('File uploaded successfully.');
  });

};

module.exports = {
  uploadFile,
};
