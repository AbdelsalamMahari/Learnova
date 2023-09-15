const { Student } = require("../models/StudentsModel");
const Token = require("../models/STokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

// send password link
module.exports.sendPassLink = async (req, res) => {
	try {
		const emailSchema = Joi.object({
			email: Joi.string().email().required().label("Email"),
		});
		const { error } = emailSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let student = await Student.findOne({ email: req.body.email });
		if (!student)
			return res
				.status(409)
				.send({ message: "student with given email does not exist!" });

		let token = await Token.findOne({ studentId: student._id });
		if (!token) {
			token = await new Token({
				studentId: student._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}
		const url = `${process.env.BASE_URL}/password-reset/${student._id}/${token.token}/`;

		await sendEmail(student.email, "Password Reset", url);

		res
			.status(200)
			.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

// verify password reset link
module.exports.verifyPass = async (req, res) => {
	try {
		const student = await Student.findOne({ _id: req.params.id });
		if (!student) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			studentId: student._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

//  set new password

module.exports.setNewPass = async (req, res) => {
    try {
        const passwordSchema = Joi.object({
            password: Joi.string().required().label("Password"),
        });

        const { error } = passwordSchema.validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const student = await Student.findOne({ _id: req.params.id });

        if (!student) {
            return res.status(400).send({ message: "Invalid link" });
        }

        const token = await Token.findOneAndDelete({
            studentId: student._id,
            token: req.params.token,
        });

        if (!token) {
            return res.status(400).send({ message: "Invalid link" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        student.password = hashPassword;
        await student.save();

        res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};