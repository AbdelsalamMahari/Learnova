const { Student, validate } = require("../models/StudentsModel");
const Token = require("../models/TokenModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res) => {
  try {
    const { error } = validate(req.body);
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
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error(error);
  }
};
