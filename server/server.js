const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const signupRoutes = require('./routes/SignupRoute');
const loginRoutes = require('./routes/LoginRoute');
const QuestionRoute = require('./routes/QuestionRoute');
const EnrollemntRoute = require('./routes/EnrollentRoute');
const PaymentEnrollemntRoute = require('./routes/PaymentEnrollemntRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(signupRoutes, loginRoutes,QuestionRoute,EnrollemntRoute,PaymentEnrollemntRoute);

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected To MongoDB, Server Works!'))
.catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
