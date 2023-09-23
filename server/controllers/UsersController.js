const { User, validatePassword } = require('../models/UsersModel');
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/usersProfiles');
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname);
  },
});

const upload = multer({ storage });

module.exports.profile = (req, res) => {
  upload.single('profilePic')(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send('File upload failed.');
    }

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    try {
      const user = await User.findById(req.params.id);

      user.profilePic = req.file.originalname;

      await user.save();

      return res.status(200).json('File uploaded successfully.');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error.');
    }
  });
};

module.exports.getProfilePhoto = async (req, res) => {
  try {
    const profilePhoto = await User.findById(req.params.profilePhotoID);
    if (!profilePhoto) {
      return res.status(404).json({ error: 'profilePhoto not found.' });
    }

    const relativeImagePath = profilePhoto.profilePic;

    const absoluteImagePath = path.join(__dirname, '..', '..', 'client', 'public', 'usersProfiles', relativeImagePath);

    
    if (!fs.existsSync(absoluteImagePath)) {
      return res.status(404).json({ error: 'File not found.', imagePath: absoluteImagePath });
    }

    
    res.sendFile(absoluteImagePath);
  } catch (err) {
    
    console.error('Error retrieving certificateUpload photo:', err);

    
    res.status(500).json({ error: 'Internal Server Error', errorMessage: err.message });
  }
};

// Update
module.exports.updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const updateStudent = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json({ message: "User Updated Successfully!" });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "You can update only your account!" });
  }
};

//update password
module.exports.updatePassword = async (req, res) => {
  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (!req.body.password) {
        return res.status(400).json({ message: "New password is required!" });
      }
      const { error } = validatePassword(req.body);
      if (error)
          return res.status(400).send({ message: error.details[0].message });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const updateStudent = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { password: hashedPassword },
        },
        { new: true }
      );

      res.status(200).json({ message: "Password Updated Successfully!" });
    } else {
      res.status(403).json({ message: "You can update only your account!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


//Delete
module.exports.deleteUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted" });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json({ message: 'You can delete only your account!' });
    }
  };

//Get
module.exports.getUser = async (req, res) => {
      try {
        const student = await User.findById(req.params.id);
        res.status(200).json(student);
      } catch (err) {
        res.status(500).json(err);
      }
};

//Get all
module.exports.getAllUser = async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
      try {
        const students = query ? await Student.find().sort({_id:-1}).limit(10) : await Student.find();
        res.status(200).json(students);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json({ message: 'You are not allowed to see all users' });
    }
  };

//Get user stats
module.exports.statUser = async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
if (req.user.isAdmin){
try{
    const data = await Student.aggregate([
        {
            $project:{
                month: {$month: "$createdAt"}
            }
        },{
            $group: {
                _id: "$month",
                total: {$sum:1}
            }
        }
    ]);
    res.status(200).json(data)
}catch(err){
    res.status(500).json(err);
}
}
else{
  res.status(403).json('You are not allowed to see stats users');
};
}

module.exports.getAllInstructors = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const instructors = await User.find({ role: 'instructor', isInstructor: false }); // Filter by 'role' and 'isInstructor'

      res.status(200).json(instructors);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: 'You are not allowed to see all instructors' });
  }
};

module.exports.getInstructors = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const instructors = await User.find({ isInstructor: true }); // Filter by 'role' and 'isInstructor'

      res.status(200).json(instructors);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: 'You are not allowed to see all instructors' });
  }
};

module.exports.getStudents = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const Students = await User.find({ isInstructor: false }); // Filter by 'role' and 'isInstructor'

      res.status(200).json(Students);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: 'You are not allowed to see all Students' });
  }
};


