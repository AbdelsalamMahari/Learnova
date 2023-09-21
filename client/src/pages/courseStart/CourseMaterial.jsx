import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import SideBar from "../../components/sidebars/StudentSideBar";
import Icons from "../../assets/icons/icons";
import "./assets/css/style.css";

export default function CourseStart() {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
const imgURL="/courseimages/"
  useEffect(() => {
           
    const fetchCourseContent = async () => {
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
    };

    fetchCourseContent();
  }, [id]); 

  return (
    <>
      <div className="container-dash-st">
        <SideBar />
        <div className="main-dash-st">
          <div className="topbar">
            <div className="toggle">
              <Icons.Bars size={24} />
            </div>
          </div>
          {course ? (
            
            <div className="course-content">
              <h2>{course.name}</h2>
              <p>{course.description}</p>
              {course.content.map((courseItem) => (
                <div key={courseItem._id["$oid"]}>
                  <h2>{courseItem.title}</h2>
                  <p>{courseItem.subtitle}</p>
                  <ul>
                    {courseItem.lessons.map((lesson) => (
                      <li key={lesson._id["$oid"]}>
                        <h3>{lesson.content}</h3>
                        <img src={imgURL+lesson.image} alt={lesson.image} className="courseinfo-images"/>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
           
            <p>Loading course content...</p>
          )}
        </div>
      </div>
    </>
  );
}
