const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    googleId: { type: String },
    profilePic: { type: String, default: "" },
    role: { type: String, required: true, enum: ["student", "instructor"], },
    isIntructor: { type: Boolean, default: false },
    cv: { type: String },
    phoneNumber: { type: String },
    isAdmin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function () {
  // Generate access token
  const token = jwt.sign(
    { id: this._id, isAdmin: this.isAdmin, isIntructor: this.isIntructor },
    process.env.SECRET_KEY,
    { expiresIn: "5d" }
  );
  return token;
};

const User = mongoose.model("users", UserSchema);

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

module.exports = { User, validate, validatePassword };
