const { Student, validate: validateStudent } = require("../models/StudentsModel");
const { Teacher, validate: validateTeacher } = require("../models/TeachersModel");
const Token = require("../models/TokenModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");

// Student Signup
module.exports.signupStudent = async (req, res) => {
  try {
    const { error } = validateStudent(req.body); // Use validateStudent for student validation
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let student = await Student.findOne({ email: req.body.email });
    if (student)
      return res
        .status(409)
        .send({ message: "Student with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    student = await new Student({ ...req.body, password: hashPassword }).save();

    const token = await new Token({
      studentId: student._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/students/${student.id}/verify/${token.token}`;

    await sendEmail(student.email, "Verify Email", url);

    res.status(201).send({
      message:
        "An email has been sent to your account. Please verify your email.",
    });
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports.link = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });
    if (!student) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      studentId: student._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ message: "Invalid link" });

    await Student.updateOne({ _id: student._id }, { $set: { verified: true } });

    res.status(200).send({ message: "Email verified successfully" });
    console.log(res)
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};

// Teacher Signup
module.exports.signupTeacher = async (req, res) => {
  try {
    const { error } = validateTeacher(req.body); // Use validateTeacher for teacher validation
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let teacher = await Teacher.findOne({ email: req.body.email });
    if (teacher)
      return res
        .status(409)
        .send({ message: "Teacher with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    teacher = await new Teacher({ ...req.body, password: hashPassword }).save();

    const token = await new Token({
      teacherId: teacher._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    res.status(201).send({
      message:
        "An email has been sent to your account. Please verify your email.",
    });
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Teacher Email Verification
module.exports.linkTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ _id: req.params.id });
    if (!teacher) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      teacherId: teacher._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ message: "Invalid link" });

    await Teacher.updateOne({ _id: teacher._id }, { $set: { verified: true } });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};
