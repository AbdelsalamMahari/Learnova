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
import CourseStart from "./pages/courseStart/CourseStart"
import ScrollToTopButton from './components/scroll/Scroll'

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


          <Route path="courseInfo" element={<CourseInfo />} />
          <Route path="courseStart" element={<CourseStart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
