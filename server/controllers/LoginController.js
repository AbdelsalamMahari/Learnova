const { Student } = require("../models/StudentsModel");
const { Teacher } = require("../models/TeacherModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Student
module.exports.login = async (req, res) => {
    try {
        const { error } = validateStudent(req.body); // Rename the validate function
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const student = await Student.findOne({ email: req.body.email });
        if (!student)
            return res.status(401).send({ message: "Invalid Email or Password" });
        if (student.googleId) {
            // User exists but has a Google ID, indicating a Google OAuth user
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            student.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const token = student.generateAuthToken();
        res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const validateStudent = (data) => { 
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

// Teacher
module.exports.loginTeacher = async (req, res) => {
    try {
        const { error } = validateTeacher(req.body); // Rename the validate function
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const teacher = await Teacher.findOne({ email: req.body.email });
        if (!teacher)
            return res.status(401).send({ message: "Invalid Email or Password" });
			if (teacher.googleId) {
				// User exists but has a Google ID, indicating a Google OAuth user
				return res.status(401).send({ message: "Invalid Email or Password" });
			}
        const validPassword = await bcrypt.compare(
            req.body.password,
            teacher.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const token = teacher.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const validateTeacher = (data) => { 
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};
