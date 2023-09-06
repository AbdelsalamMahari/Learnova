const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const StudentSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String },
	email: { type: String, required: true },
	password: { type: String },
	googleId: { type: String },
	profilePic: { type: String, default: "" },
	verified: { type: Boolean, default: false },
},
{ timestamps: true }
);

StudentSchema.methods.generateAuthToken = function () {
    // Generate access token
    const token = jwt.sign(
		{ id: this._id, role: "student"},
		process.env.SECRET_KEY,
		{ expiresIn: "5d" }
	  );
	return token;
};

const Student = mongoose.model("students", StudentSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

const validatePassword = (data) => {
	const schema = Joi.object({
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
  };

module.exports = { Student, validate, validatePassword };