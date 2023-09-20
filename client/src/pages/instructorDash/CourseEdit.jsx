import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebars/InstructorSideBar";
import Icons from "../../assets/icons/icons";
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";

export default function CourseEdit() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);
      console.log(userInfo);

      axios
        .get("http://localhost:5000/courses/")
        .then((response) => {
          const filteredCourses = response.data.filter(
            (course) => course.instructor === userInfo._id
          );
          setCourses(filteredCourses);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
          setIsLoading(false);
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
          {isLoading ? (
            <p>Loading content...</p>
          ) : (
            <>
              <h2>{user.firstName + " " + user.lastName} courses</h2>
              <ul>
                {courses.map((course) => (
                  <li key={course._id}>
                    <h3>{course.name}</h3>
                    <p>{course.description}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
