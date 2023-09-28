import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebars/InstructorSideBar";
import Icons from "../../assets/icons/icons";
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";
import { toast, ToastContainer } from 'react-toastify';
export default function CourseEdit() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState(""); // Initialize with null
  const [updatedCourses, setUpdatedCourses] = useState({}); // Track updated courses

  useEffect(() => {
    async function fetchData() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);

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
  const handleDeleteCourse = async (courseId) => {
    try {
        
        const enrollmentsResponse = await axios.get('http://localhost:5000/get/enrollement');
        const enrollmentsData = enrollmentsResponse.data;


        const isCourseInEnrollments = enrollmentsData.some((enrollment) =>
            enrollment.course === courseId
        );

        if (isCourseInEnrollments) {

            toast.error('This course cannot be deleted as it is enrolled by users.');
        } else {

            await axios.delete(`http://localhost:5000/courses/delete/${courseId}`);
            setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
            toast.success('Course and associated questions deleted successfully.');
        }
    } catch (error) {
        console.error('Error deleting course and associated questions:', error);
        toast.error('An error occurred while deleting the course.');
    }
};


  const toggleCourseContent = (course) => {
    if (expandedCourse === course._id) {
      // Collapse the currently expanded course
      setExpandedCourse(null);
    } else {
      // Expand the clicked course
      setExpandedCourse(course._id);
    }
  };

  const handleCloseCourseContent = () => {
    setExpandedCourse(null);
  };

  const handleChangeImage = (event, courseId, chapterIndex, lessonIndex) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const updatedCoursesCopy = { ...updatedCourses };
    const updatedCourseCopy = { ...updatedCoursesCopy[courseId] };

    if (!updatedCourseCopy.content) {
      updatedCourseCopy.content = [...courses.find((c) => c._id === courseId).content];
    }

    if (!updatedCourseCopy.content[chapterIndex]) {
      updatedCourseCopy.content[chapterIndex] = { ...courses.find((c) => c._id === courseId).content[chapterIndex] };
    }

    if (!updatedCourseCopy.content[chapterIndex].lessons[lessonIndex]) {
      updatedCourseCopy.content[chapterIndex].lessons[lessonIndex] = { ...courses.find((c) => c._id === courseId).content[chapterIndex].lessons[lessonIndex] };
    }

    updatedCourseCopy.content[chapterIndex].lessons[lessonIndex].image = fileName;
    updatedCoursesCopy[courseId] = updatedCourseCopy;

    setUpdatedCourses(updatedCoursesCopy);
  };

  const handleUpdateCourse = async (courseId) => {
    const updatedCourse = updatedCourses[courseId];

    if (updatedCourse) {

      try {
        updatedCourse.deployable = false;
        const response = await axios.put(
          `http://localhost:5000/courses/update/${courseId}`,
          updatedCourse
        );
        console.log("Course updated successfully:", response.data);
        const updatedCoursesCopy = { ...updatedCourses };
        delete updatedCoursesCopy[courseId];
        setUpdatedCourses(updatedCoursesCopy);
      } catch (error) {
        console.error("Error updating course:", error);
      }
    }
  };

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
              <ul className={`flex ${expandedCourse ? 'flex-col' : 'flex-row'}`}>
                {courses.map((course) => (
                  <li
                    key={course._id}
                    className={`flex-1 shadow-2xl bg-white rounded-2 m-2 ${
                      expandedCourse !== course._id ? "w-16/32" : "w-full"
                    }`}
                  >
                    <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                      <label className="block text-gray-700 font-bold mb-2">
                              Course Title:
                            </label>
                    <input
                      type="text"
                      name="title"
                      value={updatedCourses[course._id] ? updatedCourses[course._id].name : course.name}
                      onChange={(e) => {
                        const updatedCourseCopy = { ...updatedCourses[course._id] };
                        updatedCourseCopy.name = e.target.value;
                        setUpdatedCourses({ ...updatedCourses, [course._id]: updatedCourseCopy });
                      }}
                      className="lg:text-2xl w-full border-b-2 border-blue-500 focus:outline-none"
                    />
                      <label className="block text-gray-700 font-bold mb-2">
                              Course Description:
                            </label>
                    <textarea
                      name="description"
                      value={
                        updatedCourses[course._id]
                          ? updatedCourses[course._id].description
                          : course.description
                      }
                      onChange={(e) => {
                        const updatedCourseCopy = { ...updatedCourses[course._id] };
                        updatedCourseCopy.description = e.target.value;
                        setUpdatedCourses({ ...updatedCourses, [course._id]: updatedCourseCopy });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    ></textarea>
                    {expandedCourse === course._id ? (
                      <div>
                        <h4 className="text-xl font-semibold mb-2">
                          Course Content
                        </h4>
                        {course.content.map((chapter, chapterIndex) => (
                          <div key={chapterIndex} className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                              Chapter Title:
                            </label>
                            <input
                              type="text"
                              name="chapterTitle"
                              value={
                                updatedCourses[course._id]
                                  ? updatedCourses[course._id].content[chapterIndex].title
                                  : chapter.title
                              }
                              onChange={(e) => {
                                const updatedCourseCopy = { ...updatedCourses[course._id] };
                                if (!updatedCourseCopy.content) {
                                  updatedCourseCopy.content = [...course.content];
                                }
                                if (!updatedCourseCopy.content[chapterIndex]) {
                                  updatedCourseCopy.content[chapterIndex] = { ...course.content[chapterIndex] };
                                }
                                updatedCourseCopy.content[chapterIndex].title = e.target.value;
                                setUpdatedCourses({ ...updatedCourses, [course._id]: updatedCourseCopy });
                              }}
                              className="text-lg font-semibold w-full border-b-2 border-blue-500 focus:outline-none"
                            />
                            {chapter.lessons.map((lesson, lessonIndex) => (
                              <div key={lessonIndex} className="mb-2">
                                <label className="block text-gray-700 font-bold mb-2">
                                  Subtitle:
                                </label>
                                <input
                                  type="text"
                                  name="subtitle"
                                  value={
                                    updatedCourses[course._id]
                                      ? updatedCourses[course._id].content[chapterIndex].lessons[lessonIndex].subtitle
                                      : lesson.subtitle
                                  }
                                  onChange={(e) => {
                                    const updatedCourseCopy = { ...updatedCourses[course._id] };
                                    if (!updatedCourseCopy.content) {
                                      updatedCourseCopy.content = [...course.content];
                                    }
                                    if (!updatedCourseCopy.content[chapterIndex]) {
                                      updatedCourseCopy.content[chapterIndex] = { ...course.content[chapterIndex] };
                                    }
                                    if (!updatedCourseCopy.content[chapterIndex].lessons[lessonIndex]) {
                                      updatedCourseCopy.content[chapterIndex].lessons[lessonIndex] = { ...lesson };
                                    }
                                    updatedCourseCopy.content[chapterIndex].lessons[lessonIndex].subtitle =
                                      e.target.value;
                                    setUpdatedCourses({ ...updatedCourses, [course._id]: updatedCourseCopy });
                                  }}
                                  className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                <label className="block text-gray-700 font-bold mb-2">
                                  Lesson Content:
                                </label>
                                <textarea
                                  name="content"
                                  value={
                                    updatedCourses[course._id]
                                      ? updatedCourses[course._id].content[chapterIndex].lessons[lessonIndex].content
                                      : lesson.content
                                  }
                                  onChange={(e) => {
                                    const updatedCourseCopy = { ...updatedCourses[course._id] };
                                    if (!updatedCourseCopy.content) {
                                      updatedCourseCopy.content = [...course.content];
                                    }
                                    if (!updatedCourseCopy.content[chapterIndex]) {
                                      updatedCourseCopy.content[chapterIndex] = { ...course.content[chapterIndex] };
                                    }
                                    if (!updatedCourseCopy.content[chapterIndex].lessons[lessonIndex]) {
                                      updatedCourseCopy.content[chapterIndex].lessons[lessonIndex] = { ...lesson };
                                    }
                                    updatedCourseCopy.content[chapterIndex].lessons[lessonIndex].content =
                                      e.target.value;
                                    setUpdatedCourses({ ...updatedCourses, [course._id]: updatedCourseCopy });
                                  }}
                                  className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                ></textarea>
                                <label className="block text-gray-700 font-bold mb-2">
                                  Lesson Image:
                                </label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleChangeImage(
                                      e,
                                      course._id,
                                      chapterIndex,
                                      lessonIndex
                                    )
                                  }
                                  className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {lesson.image && (
                                  <img
                                    src={`/courseimages/${lesson.image}`}
                                    alt={lesson.subtitle}
                                    className="mt-2 max-w-xs"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <button onClick={() => toggleCourseContent(course)} className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none ">
                          Show Course Content
                        </button>
                      
                      </>
                    )}
                    <button onClick={() => handleUpdateCourse(course._id)} className="bg-green-500  text-white font-bold py-2 px-4 rounded focus:outline-none ">
                      Update Course
                    </button>
                    <button onClick={handleCloseCourseContent} className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none ">Cancel</button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
