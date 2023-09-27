import React, { useState, useEffect } from 'react';
import TopPage from "../../components/topPage/TopPage";
import Footer from "../../layout/footer/Footer";
import UserInfo from '../../components/users/UserInfo';
import axios from 'axios';
import "./MyCourses.css";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const [EnrollmentData, setEnrollmentData] = useState([]);
  const [CourseData, setCourseData] = useState([]);
  const user = UserInfo();

  useEffect(() => {
    const fetchAllEnrollments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get/enrollement');
        const filteredEnrollments = response.data.filter(enrollment => enrollment.user === user._id);
        setEnrollmentData(filteredEnrollments);
        console.log(filteredEnrollments)
        const coursePromises = filteredEnrollments.map(enrollment => 
          axios.get(`http://localhost:5000/courses/${enrollment.course}`)
        );
        
        const courseResponses = await Promise.all(coursePromises);
        const courseData = courseResponses.map(response => response.data);
        setCourseData(courseData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllEnrollments();
  }, [user]);

  return (
    <>
      <TopPage
        title="My Courses"
        backgroundImageUrl="https://wallpaperaccess.com/full/1691795.jpg"
      />
      <div className="main-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EnrollmentData.map((enrollment, index) => (
            <Link
              to={`/courseInfo/${enrollment.course}`} 
              key={enrollment._id}
              className="bg-white rounded p-4 m-2"
            >
              {CourseData[index] ? (
                <>
                  <img
                    src={`http://localhost:5000/courses/getBackdrop/${enrollment.course}`}
                    alt="Upload"
                    style={{ height: '200px', objectFit: 'cover', width: '400px' }}
                    className='rounded'
                  />
                  <p className="text-xl font-semibold">{CourseData[index].name}</p>
                  <div className="custom-progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${enrollment.completedPercentage}%` }}
                    ><p className='bar-percentage'>{enrollment.completedPercentage}%</p></div>
                  </div>
                </>
              ) : (
                <p>Course data loading...</p>
              )}
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
