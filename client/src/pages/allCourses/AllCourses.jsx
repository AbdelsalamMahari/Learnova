import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllCourses.css";
import TopPage from "../../components/topPage/TopPage";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
  
    axios
      .get("http://localhost:5000/courses") 
      .then((response) => {
        setCourses(response.data);
        console.log(response.data); 
      })
      .catch((error) => console.error("Error fetching course data:", error));
  }, []);

  return (
    <>
      <TopPage
        title="All Courses"
        backgroundImageUrl="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/02/bg-08-free-img.jpg"
      />

      <div className="flex p-[20px] gap-6 cont-course">
        {courses.map((course, index) => (
          <div key={index} className="flex-1 shadow-2xl">
            <div>
              <img
                src={course.imageSrc || ""}
                alt={`course${index + 1}`}
                className="w-full"
              />
            </div>
            <div className="flex flex-col p-3 gap-3 bg-white border">
              <div>
                <h1 className="lg:text-2xl w-full">{course.name}</h1>
              </div>
              <div>
                <button
      
                  className="bg-blue rounded w-full p-1 text-white"
                >
                 Purchase this course
                </button>
              </div>
              <div>
        
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
