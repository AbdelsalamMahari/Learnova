import React, { useState } from "react";
import axios from "axios";

const AddCourseModal = ({ isOpen, onClose, onSave }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseSubtitle, setCourseSubtitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [courseData, setCourseData] = useState([]);

  const handleAddLesson = () => {
    if (lessonContent.trim() !== "") {
      setCourseData((prevCourseData) => [
        ...prevCourseData,
        {
          title: courseTitle,
          subtitle: courseSubtitle,
          lessons: [{ content: lessonContent }],
        },
      ]);
      setCourseTitle("");
      setCourseSubtitle("");
      setLessonContent("");
    }
  };

  const handleCloseModal = () => {
    setCourseTitle("");
    setCourseSubtitle("");
    setLessonContent("");
    onClose();
  };

  const handleSaveCourse = async () => {
    try {

      const apiUrl = 'http://localhost:5000/courses/create';

      const response = await axios.post(apiUrl, courseData); 

      if (response.status === 201) {
      
        setCourseData([]); 
        onSave(courseData); 
        handleCloseModal(); 
      } else {
       
        console.error('Error saving course');
      }
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="w-full text-center sm:text-left" id="modal-headline">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add Course Details
              </h3>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Course Title"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="border border-pink rounded-md w-full p-2"
                />
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Course Subtitle"
                  value={courseSubtitle}
                  onChange={(e) => setCourseSubtitle(e.target.value)}
                  className="border border-pink rounded-md w-full p-2"
                />
              </div>
              <div className="mt-2">
                <textarea
                  placeholder="Lesson Content"
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  className="border border-pink rounded-md w-full p-2 h-40" // Adjust the height as needed
                />
              </div>
              <div className="mt-2">
                <button
                  onClick={handleAddLesson}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Add Lesson
                </button>
              </div>
              {courseData.length > 0 && (
                <ul className="mt-2">
                  {courseData.map((course, index) => (
                    <li key={index} className="py-2">
                      <strong>{course.title}</strong> - {course.subtitle}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleSaveCourse}
                  className="px-4 py-2 text-black bg-white border border-black rounded-md hover:bg-gray-200  ml-2"
                >
                  Save Course
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-black bg-white border border-black rounded-md hover:bg-gray-200  ml-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
