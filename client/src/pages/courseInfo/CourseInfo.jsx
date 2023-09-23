import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TopPage from "../../components/topPage/TopPage";
import Icons from "../../assets/icons/icons";
import Footer from "../../layout/footer/Footer";
import Button from "../../components/buttons/button";
import Loading from "../../components/loading/loading";
import UserInfo from "../../components/users/UserInfo";
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";
import axios from "axios";

export default function CourseInfo() {
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const [EnrollmentData, setEnrollmentData] = useState({
    user: '',
    course: '',
    enrollmentStatus: 'Enrolled',
    completionStatus: 'Not Started',
    completedChapters: 0,
    grade: 0,
    instructor: '', 
  });

  const { id } = useParams();

  const HandleStartButton = async (e) => {
    try {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);

    
      const courseResponse = await fetch(`http://localhost:5000/courses/${id}`);
      if (!courseResponse.ok) {
        throw new Error("Course not found");
      }
      const courseData = await courseResponse.json();

      
      const updatedEnrollmentData = {
        user: userInfo._id,
        course: id,
        enrollmentStatus: 'Enrolled',
        completionStatus: 'Not Started',
        completedChapters: 0,
        grade: 0,
        instructor: courseData.instructor, 
      };


      const response = await axios.post("http://localhost:5000/add/enrollement", updatedEnrollmentData);
      console.log("Enrollment created:", response.data);
    } catch (error) {
      console.error("Error creating enrollment:", error);
    }
  };
  

  useEffect(() => {
    async function fetchData() {
      try {
     
        const userInfo = await fetchUserInfoFromToken();
        setUser(userInfo);
        console.log(userInfo);

   
        const response = await fetch(`http://localhost:5000/courses/${id}`);
        if (!response.ok) {
          throw new Error("Course not found");
        }
        const data = await response.json();
        setCourse(data);
        console.log(data);
        console.log(data.content[0].title);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [id]);

  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  if (!course) {
    return <Loading />;
  }

  return (
    <>
      <TopPage
        title={course.name}
        backgroundImageUrl="https://as2.ftcdn.net/v2/jpg/01/34/59/53/1000_F_134595318_krCNHoUx2KWoFZhFPGtJQg6Bv6dkrBMR.jpg"
      />
      <section>
        <div className="m-10 p-10 bg-white rounded">
          <div>
            <h1 className="flex justify-between lg:text-4xl font-bold ">Course Description <div className="ml-5">Price: ${course.Price}</div></h1>
            <p className="mt-5">{course.description}</p>
          
  <h2 className="lg:text-2xl font-semibold"></h2>

          </div>
          <div className="mt-10">
            <div className="flex justify-between">
              <h1 className="lg:text-4xl font-bold">Course Content</h1>
              <Link to={`/courseMaterial/${course._id}`}>
                <Button text="START" onClick={HandleStartButton} />
              </Link>
            </div>
            <div className="mt-4 w-3/4 ml-12 ">
              {course.content.map((chapter, chapterIndex) => (
                <div key={chapterIndex}>
                  <h2
                    className="px-3 flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => toggleAccordion(chapterIndex)}
                  >
                    <span>{chapter.title}</span>
                  </h2>
                  <div
                    className={`${
                      activeAccordion === chapterIndex ? "block" : "hidden"
                    } p-5 border border-b-0 border-gray-200 dark:border-gray-700`}
                  >
              
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="mt-3">
                        <p className="text-lg font-semibold">
                          {lesson.subtitle}
                        </p>
                       
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div
                className={`${
                  activeAccordion === 2 ? "block" : "hidden"
                } p-5 border border-t-0 border-gray-200 dark:border-gray-700`}
              >
                <div className="px-3">
                  <p className="py-2 text-gray-500 dark:text-gray-400 border-b">
                    Anatomy of tags
                  </p>
                  <p className="py-2 text-gray-500 dark:text-gray-400">
                    Selectors in CSS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
