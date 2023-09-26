const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport');
const session = require("express-session");
const passportStrategy = require("./passport");
const bodyParser = require("body-parser")


const imageUploadRoute = require("./routes/imageUploadRoute");
const contactRoutes = require("./routes/ContactRoute");
const signupRoutes = require("./routes/SignupRoute");
const loginRoutes = require("./routes/LoginRoute");
const surveyRoutes = require("./routes/SurveyRoute");
const examRoutes = require("./routes/ExamsRoute");
const feedbackRoutes = require("./routes/FeedbackRoute");
const coursesRoutes = require("./routes/CourseRoutes");
const QuestionRoute = require("./routes/QuestionRoute");
const EnrollemntRoute = require("./routes/EnrollentRoute");
const UserRoutes = require("./routes/UsersRoutes");
const googleRoute = require('./routes/GoogleRoutes');
const forgetPassRoute = require('./routes/ForgetPassRoutes');
const paymentRoute = require('./routes/PaymentRoute');
const subscriptionRoute = require('./routes/SubscriptionRoute');
const scoreRoute = require('./routes/ScoreRoute');
const examScoreRoute = require('./routes/ScoreExamRoute');
const purchaseRoute = require('./routes/PurchasesRoute');
const bankQuestionRoute = require('./routes/BankQuestionRoute');
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

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

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
  EnrollemntRoute,
  UserRoutes,
  forgetPassRoute,
  contactRoutes,
  paymentRoute,
  subscriptionRoute,
  scoreRoute,
  examScoreRoute,
  purchaseRoute,
  bankQuestionRoute
);
app.use("/courses", coursesRoutes);
app.use('/auth', googleRoute);
app.use('/image', imageUploadRoute);


app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
