const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport');
const session = require("express-session");
const passportStrategy = require("./passport");
const contactRoutes = require("./routes/ContactRoute");
const signupRoutes = require("./routes/SignupRoute");
const loginRoutes = require("./routes/LoginRoute");
const surveyRoutes = require("./routes/SurveyRoute");
const examRoutes = require("./routes/ExamsRoute");
const feedbackRoutes = require("./routes/FeedbackRoute");
const teacherRoutes = require("./routes/TeacherRoute");
const coursesRoutes = require("./routes/CourseRoutes");
const QuestionRoute = require("./routes/QuestionRoute");
const EnrollemntRoute = require("./routes/EnrollentRoute");
const PaymentEnrollemntRoute = require("./routes/PaymentEnrollemntRoute");
const studentRoutes = require("./routes/StudentsRoutes");
const googleRoute = require('./routes/GoogleRoutes');
const forgetPassRoute = require('./routes/ForgetPassRoutes');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	session({
	  secret: `${process.env.SECRET_KEY}`,
	  resave: false,
	  saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected To MongoDB, Server Works!"))
  .catch((err) => console.log(err));

app.use(
  signupRoutes,
  loginRoutes,
  surveyRoutes,
  QuestionRoute,
  examRoutes,
  feedbackRoutes,
  teacherRoutes,
  EnrollemntRoute,
  PaymentEnrollemntRoute,
  studentRoutes,
  forgetPassRoute,
  contactRoutes
);
app.use("/courses", coursesRoutes);
app.use('/auth', googleRoute);

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
