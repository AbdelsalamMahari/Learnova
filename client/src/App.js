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
import Login from "./pages/login/Login";
import SignupS from "./pages/signup/SignupStudent";
import SignupT from "./pages/signup/SignupTeacher";
import Profile from "./pages/profile/Profile";
import Dash from './pages/dashboard/dash';
import ScrollToTopButton from './components/scroll/Scroll';
import Google from './utils/Google';
import NoPage from "./pages/nopage/404";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTopButton/>
      <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="instructors" element={<Instructors />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="allCourses" element={<AllCourses />} />
          <Route path="survey" element={<Survey />} />
          <Route path="login" element={<Login />} />
          <Route path="signupStudent" element={<SignupS />} />
          <Route path="signupTeacher" element={<SignupT />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
          <Route path="google" element={<Google />} />


          <Route path="courseInfo" element={<CourseInfo />} />
          <Route path="courseStart" element={<CourseStart />} />
          <Route path="dash" element={<Dash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
