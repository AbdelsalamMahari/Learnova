import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebars/InstructorSideBar";
import Icons from "../../assets/icons/icons";
import UserInfo from "../../components/users/UserInfo";
import { Link } from "react-router-dom";
import "./dashcours.css";
import image from "../../assets/images/LearnovaLogo.png";

function DashCourses() {
  const user = UserInfo();
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Function to filter courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-dash">
    <Sidebar />
    <div className="main-dash">
      <div className="toggle">
        <Icons.Bars size={24} />
      </div>
      <div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by course name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredCourses.length === 0 ? (
          <p>No courses found for this search.</p>
        ) : (
          <div>
            <h2>
              Courses Taught by {user ? user.firstName : "Unknown User"}
            </h2>
            <div className="course-container"> {/* Utilize the course-container */}
              {filteredCourses.map((course) => (
                <div key={course._id} className="course-item"> {/* Each course is a course-item */}
                  <Link to={`/intructorDash/createQuestion/${course._id}`}>
                    {/* Include the course image and name */}
                    <img
                      src={image} // Replace with the image source from your data
                      alt={course.name}
                      className="course-image"
                    />
                    <p className="course-name">{course.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  
  );
}

export default DashCourses;
