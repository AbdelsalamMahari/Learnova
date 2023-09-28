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
      <section className="section2-instructor">
        <div className="container2-instructor">
            {EnrollmentData.map((enrollment, index) => (
              <Link to={`/courseInfo/${enrollment.course}`} key={enrollment._id}>
                {CourseData[index] ? (
                  <>
                    <div className="first2-instructor">
                      <img
                        src={`http://localhost:5000/courses/getBackdrop/${enrollment.course}`}
                        alt="Upload"
                        className="w-28 h-28 rounded-full object-cover"
                      />
                    </div>
                    <div className="second2-instructor">
                      <h1 className="text-xl font-semibold">
                        {CourseData[index].name}
                      </h1>
                      <div>
                        <div className="h-4 bg-gray-300 rounded-full w-full">
                          <div
                            className="h-full bg-orange rounded-full"
                            style={{ width: `${enrollment.completedPercentage}%` }}
                          ></div>
                        </div>
                        <span className="float-right">
                          {enrollment.completedPercentage}% Complete
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>Course data loading...</p>
                )}
              </Link>
            ))}
          </div>
      </section>


      <Footer />
    </>
  );
}
