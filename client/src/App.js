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
import CourseMaterial from "./pages/courseStart/CourseMaterial";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
import ScrollToTopButton from "./components/scroll/Scroll";
import Google from "./utils/Google";
import NoPage from "./pages/nopage/404";
import EmailVerify from "./pages/emailVerify/EmailVerify";
import ForgetPass from "./pages/forgetPass/ForgetPass";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import InstructorRoute from "./utils/Instructor/protectedRoute";
import AdminRoute from "./utils/Admin/protectedRoute";
import CourseQuestion from "./pages/courseStart/CourseQuestion";
import Certificate from "./pages/certificatee/Certificate";
import CourseEdit from "./pages/instructorDash/CourseEdit";
import CourseExam from "./pages/courseStart/CourseExam";

// Intructor Dashboard
import IntructorDash from "./pages/instructorDash/dash";
import CreateCourse from "./pages/instructorDash/CreateCourse";
import CreateQuestion from "./pages/instructorDash/CreateQuestion";
import DashCourses from "./pages/instructorDash/Courses";
import DashCoursesExams from "./pages/instructorDash/ExamsCourses";
import DashExam from "./pages/instructorDash/CreateExam";

// Admin Dashboard
import AdminDash from "./pages/adminDash/AdminDash";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import Requests from "./pages/adminDash/Requests";
import Instructorss from "./pages/adminDash/Instructorss";
import Feedbacks from "./pages/adminDash/feedback";

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
        <Route path="/courseMaterial/:id" element={<CourseMaterial />} />
        <Route path="/questions/:id" element={<CourseQuestion />} />
        <Route path="/exam/:id" element={<CourseExam />} />
        <Route path="courseInfo/:id" element={<CourseInfo />} />
        <Route path="imageupload" element={<ImageUpload />} />
        <Route path="/:id/certificate/:user" element={<Certificate />} />
        <Route
          path="/intructorDash"
          element={
            <InstructorRoute
              element={<IntructorDash />}
              path="/intructorDash"
            />
          }
        />
        <Route
          path="/intructorDash/createQuestion/:id"
          element={
            <InstructorRoute
              element={<CreateQuestion />}
              path="/intructorDash/createQuestion/:id"
            />
          }
        />
        <Route
          path="/intructorDash/createCourse"
          element={
            <InstructorRoute
              element={<CreateCourse />}
              path="/intructorDash/createCourse"
            />
          }
        />
         <Route
          path="/intructorDash/editCourses"
          element={
            <InstructorRoute
              element={<CourseEdit/>}
              path="/intructorDash/editCourses"
            />
          }
        />
                <Route
          path="/intructorDash/dashCourses"
          element={
            <InstructorRoute
              element={<DashCourses />}
              path="/intructorDash/dashCourses"
            />
          }
        />
        <Route
          path="/intructorDash/dashCoursesExams"
          element={
            <InstructorRoute
              element={<DashCoursesExams />}
              path="/intructorDash/dashCoursesExams"
            />
          }
        />
        <Route
          path="/intructorDash/createQuestionExam/:id"
          element={
            <InstructorRoute
              element={<DashExam />}
              path="/intructorDash/createQuestionExam/:id"
            />
          }
        />
        <Route
          path="/adminDash"
          element={<AdminRoute element={<AdminDash />} path="/adminDash" />}
        />
        <Route
          path="/adminDash/requests"
          element={
            <AdminRoute element={<Requests />} path="/adminDash/requests" />
          }
        />
         <Route
          path="/adminDash/instructorss"
          element={<AdminRoute element={<Instructorss />} path="/adminDash/instructorss" />}
        />
         <Route
          path="/adminDash/feedback"
          element={<AdminRoute element={<Feedbacks />} path="/adminDash/feedbacks" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
