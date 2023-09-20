import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebars/InstructorSideBar";
import Icons from "../../assets/icons/icons";
import ImageUpload from "../../components/ImageUpload/ImageUpload"; 
import UserInfo from '../../components/users/UserInfo';
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";

export default function CourseEdit() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);

      axios.get("http://localhost:5000/courses/")
        .then((response) => {
          // Filter courses where instructor matches user._id
          const filteredCourses = response.data.filter(
            (course) => course.instructor === userInfo._id
          );
          setCourses(filteredCourses);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
        });
    }

    fetchData();
  }, []);

  return (
    <div className="container-dash">
      <Sidebar />
      <div className="main-dash">
        <div className="toggle">
          <Icons.Bars size={24} />
        </div>
        
        <div className="course-list">
          <h2>Your Courses</h2>
          <ul>
            {courses.map((course) => (
              <li key={course._id}>
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                {/* Add links or buttons for editing or managing the course */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
