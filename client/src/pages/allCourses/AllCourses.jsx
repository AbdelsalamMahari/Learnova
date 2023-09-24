import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllCourses.css";
import TopPage from "../../components/topPage/TopPage";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/loading";
import Footer from "../../layout/footer/Footer"

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/courses")
      .then((response) => {
        setCourses(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <TopPage
        title="All Courses"
        backgroundImageUrl="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/02/bg-08-free-img.jpg"
      />

      {isLoading ? (
        <Loading />
      ) : (
        // Updated allcourse.jsx with class names from instructors.jsx
        <div className="section2-instructor">
          {courses.map((course, index) => (
            <div className="container2-instructor" key={index}>
              <div className="first2-instructor">
                {course.backdrop ? (
                  <img
                    src={`http://localhost:5000/courses/getBackdrop/${course._id}`}
                    alt="Upload"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
                    alt="Default Profile"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                )}
              </div>
              <div className="second2-instructor">
                <h1>{course.name}</h1>
                <Link to={`/courseInfo/${course._id}`}>
                  <button className="bg-blue rounded w-full p-1 text-white">
                    See more...
                  </button>
                </Link>
              </div>
            </div>

          ))}
        </div>
      )}
      <Footer />
    </>
  );
}
