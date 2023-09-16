import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Instructors from "./pages/instructors/Instructors";
import Pricing from "./pages/pricing/Pricing";
import AllCourses from "./pages/allCourses/AllCourses";
import Survey from "./pages/survey/Survey";
import CourseInfo from "./pages/courseInfo/CourseInfo";
import CourseStart from "./pages/courseStart/CourseStart";
import Dash from './pages/dashboard/TeacherDashbaord';
import CreateCourse from './pages/dashboard/CreateCourse'
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
import AdminDash from "./pages/adminDash/AdminDash";
import ScrollToTopButton from "./components/scroll/Scroll";
import Google from "./utils/Google";
import NoPage from "./pages/nopage/404";
import DashQuestion from "./pages/Question/Questiondash.jsx"
import EmailVerify from "./pages/emailVerify/EmailVerify";
import ForgetPass from "./pages/forgetPass/ForgetPass";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import InstructorRoute from "./utils/Instructor/protectedRoute";
import AdminRoute from "./utils/Admin/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTopButton />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="instructors" element={<Instructors />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="allCourses" element={<AllCourses />} />
        <Route path="survey" element={<Survey />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NoPage />} />
        <Route path="google" element={<Google />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/forgetPass" element={<ForgetPass />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        <Route path="courseStart" element={<CourseStart />} />
        <Route path="courseInfo" element={<CourseInfo />} />
        <Route
          path="/dash"
          element={<InstructorRoute element={<Dash />} path="/dash" />}
        />
        <Route
          path="/dash/dashQuestion"
          element={<InstructorRoute element={<DashQuestion />} path="/dash/dashQuestion" />}
        />
        <Route
          path="/dash/createCourse"
          element={<InstructorRoute element={<CreateCourse />} path="/dash/createCourse" />}
        />
        <Route
          path="/adminDash"
          element={<AdminRoute element={<AdminDash />} path="/adminDash" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
