const { Teacher } = require("../models/TeachersModel");

// Update a teacher
module.exports.updateTeacher = async (req, res) => {
  try {
    // Check if the user is allowed to update
    if (req.user.id === req.params.id || req.user.isAdmin) {
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      if (!updatedTeacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      res.status(200).json({ message: "Teacher Updated Successfully!", updatedTeacher });
    } else {
      res.status(403).json({ error: "Permission denied" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a teacher
module.exports.deleteTeacher = async (req, res) => {
  try {
    // Check if the user is allowed to delete
    if (req.user.id === req.params.id || req.user.isAdmin) {
      const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

      if (!deletedTeacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      res.status(200).json({ message: "Teacher has been deleted" });
    } else {
      res.status(403).json({ error: "Permission denied" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a teacher's information
module.exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all teachers (only for admins)
module.exports.getAllTeachers = async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const teachers = await Teacher.find();
  
        if (teachers.length === 0) {
          return res.status(404).json({ error: 'No teachers found' });
        }
  
        res.status(200).json(teachers);
      } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
      }
    } else {
      res.status(403).json({ error: 'You are not allowed to see all teachers' });
    }
  };


