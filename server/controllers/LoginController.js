const { User } = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Student
module.exports.login = async (req, res) => {
  try {
    const { error } = validate(req.body); // Rename the validate function
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });
    if (user.googleId) {
      // User exists but has a Google ID, indicating a Google OAuth user
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

      if (!user.verified) {
        // User is not verified, send the verification message
        return res
          .status(400)
          .send({ message: "Please verify your email" });
      }

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
