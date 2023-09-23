import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebars/InstructorSideBar";
import Icons from "../../assets/icons/icons";
import UserInfo from "../../components/users/UserInfo";
import { Link } from "react-router-dom"; // Import Link

function DashCoursesExams() {
  const user = UserInfo();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Ensure user is not null before making the API request
    if (user && user._id) {
      // Define a function to fetch the courses for the instructor
      const fetchCourses = async () => {
        try {
          // Replace :id with the user's _id obtained from UserInfo
          const response = await axios.get(
            `http://localhost:5000/courses/instructor/${user._id}`
          );

          // Set the courses state with the response data
          setCourses(response.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
          // Handle the error as needed
        }
      };

      // Call the fetchCourses function
      fetchCourses();
    }
  }, [user]);

  return (
    <div className="container-dash">
      <Sidebar />
      <div className="main-dash">
        <div className="toggle">
          <Icons.Bars size={24} />
        </div>
        <div>
          {/* Use .map to display course names */}
          {courses.length === 0 ? (
            <p>No courses found for this instructor.</p>
          ) : (
            <div>
              <h2>
                Courses Taught by {user ? user.firstName : "Unknown User"}
              </h2>
              <ul>
                {courses.map((course) => (
                  <li key={course._id}>
                    <Link to={`/intructorDash/createQuestionExam/${course._id}`}>
                      {course.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashCoursesExams;
