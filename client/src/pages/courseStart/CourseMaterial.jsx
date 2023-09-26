import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "../../components/sidebars/StudentSideBar";
import Icons from "../../assets/icons/icons";
import "./assets/css/style.css";
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";
import axios from "axios";

export default function CourseStart() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(false);
  const imgURL = "/courseimages/";
  const [enrollmentData, setEnrollmentData] = useState({ completedChapters: [], }); // Initialize with empty completedChapters

  useEffect(() => {
    async function fetchCourseContent() {
      try {
        const response = await fetch(`http://localhost:5000/courses/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else {
          console.error("Error fetching course content");
        }
      } catch (error) {
        console.error("Error fetching course content:", error);
      }
    }

    fetchCourseContent();
  }, [id]);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);
    }

    getUserInfo();
  }, []);

  useEffect(() => {
    async function fetchDataPurchase() {
      try {
        // Check if the user has purchased this course if user exists
        if (user && course) {
          const hasPurchasedResponse = await axios.post(
            "http://localhost:5000/purchases/check",
            {
              userId: user._id,
              courseId: course._id,
            }
          );

          if (hasPurchasedResponse.data.hasPurchased) {
            setHasPurchased(true);
          } else {
            // Redirect to '/nopage' using navigate
            navigate('/nopage');
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchDataPurchase();
  }, [user, course, navigate]);

const[CoursePercentage,SetCoursePercentage]=useState(0)
  const handleNextChapter = () => {
    if (currentChapterIndex < course.content.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      console.log(CoursePercentage)
    }
  };

  const handleCompleteChapter = async () => {
    if (course && enrollmentData) {
      const currentChapter = course.content[currentChapterIndex];
      const AddPercentage = 100 / course.content.length;
      const updatedCoursePercentage = CoursePercentage + AddPercentage; 
      SetCoursePercentage(updatedCoursePercentage); 
  
      try {
        if (!enrollmentData.completedChapters.includes(currentChapter.title)) {
          enrollmentData.completedChapters.push(currentChapter.title);
  
          await axios.put(
            `http://localhost:5000/update/enrollement/${enrollmentData._id}`,
            {
              completedChapters: enrollmentData.completedChapters,
              completedPercentage: updatedCoursePercentage, // Send the updated percentage to the database
            }
          );
  
          setEnrollmentData((prevEnrollmentData) => ({
            ...prevEnrollmentData,
            completedChapters: enrollmentData.completedChapters,
          }));
        }
      } catch (error) {
        console.error("Error marking chapter as completed:", error);
      }
    }
  };
  

useEffect(() => {
  async function fetchUserData() {
    const userInfo = await fetchUserInfoFromToken();
    setUser(userInfo);
  }

  fetchUserData();
}, []);

useEffect(() => {
  const fetchCourseAndEnrollmentData = async () => {
    try {
      const [courseResponse, enrollmentsResponse] = await Promise.all([
        fetch(`http://localhost:5000/courses/${id}`),
        axios.get(`http://localhost:5000/get/enrollement`),
      ]);

      if (courseResponse.ok) {
        const courseData = await courseResponse.json();
        setCourse(courseData);
      } else {
        console.error("Error fetching course content");
      }

      if (enrollmentsResponse.status === 200) {
        const enrollments = enrollmentsResponse.data;

        if (user && user._id) {
          const matchingEnrollment = enrollments.find(
            (enrollment) =>
              enrollment.user === user._id && enrollment.course === id
          );

          if (matchingEnrollment) {
            setEnrollmentData(matchingEnrollment);
          } else {
            console.error("Matching enrollment not found.");
          }
        } else {
          console.error("User information not available.");
        }
      } else {
        console.error("Error fetching enrollments");
      }
    } catch (error) {
      console.error("Error fetching course and enrollment data:", error);
    }
  };

  fetchCourseAndEnrollmentData();
}, [id, user]);



  const isChapterCompleted = course
    ? enrollmentData.completedChapters.includes(course.content[currentChapterIndex]?.title)
    : false;

  return (
    <>
      <div className="container-dash-st">
        <SideBar course={course} />
        <div className="main-dash-st">
          <div className="topbar">
            <div className="toggle">
              <Icons.Bars size={24} />
            </div>
          </div>
          {course ? (
            <div className="course-content">
              <h2 className="main-course-title">{course.name}</h2>

              {hasPurchased ? (
                course.content.map((courseItem, index) => (
                  <div
                    key={courseItem._id["$oid"]}
                    style={{
                      display: index === currentChapterIndex ? "block" : "none",
                    }}
                  >
                    {/* ... Render course content here */}
                    <h1 className="course-title">
                      Chapter {index + 1}: {courseItem.title}
                    </h1>
                    <p className="course-subtitle">{courseItem.subtitle}</p>
                    <ul>
                      {courseItem.lessons.map((lesson) => (
                        <li key={lesson._id["$oid"]}>
                          {lesson.image && (
                            <img
                              src={imgURL + lesson.image}
                              alt={lesson.image}
                              className="courseinfo-images"
                            />
                          )}
                          <h2>{lesson.subtitle}</h2>
                          <h3>{lesson.content}</h3>
                        </li>
                      ))}
                    </ul>
                    <div className="course-navigation">
                      <button
                        className="navigation-btn"
                        onClick={handlePreviousChapter}
                        disabled={currentChapterIndex === 0}
                      >
                        Previous
                      </button>
                      <button
                        className="navigation-btn"
                        onClick={handleNextChapter}
                        disabled={
                          currentChapterIndex === course.content.length - 1
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ))
              ) : null /* Remove the <p> tag here */}
            </div>
          ) : (
            <p>Loading course content...</p>
          )}
        </div>
      </div>
    </>
  );
}
