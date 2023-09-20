import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebars/InstructorSideBar";
import Icons from "../../assets/icons/icons";
import ImageUpload from "../../components/ImageUpload/ImageUpload"; 
import UserInfo from '../../components/users/UserInfo';
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser"
export default function CourseEdit() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);
      console.log(userInfo)
    }

    getUserInfo();
   
  }, []);


  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/courses/")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
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
