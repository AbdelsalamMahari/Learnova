import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebars/InstructorSideBar";
import Icons from "../../assets/icons/icons";

export default function CreateCourse() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    chapters: [
      {
        title: "",
        subtitle: "",
        lessons: [{ content: "" }],
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChapterChange = (e, chapterIndex) => {
    const { name, value } = e.target;
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex][name] = value;
    setFormData({
      ...formData,
      chapters: updatedChapters,
    });
  };

  const handleLessonChange = (e, chapterIndex, lessonIndex) => {
    const { name, value } = e.target;
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].lessons[lessonIndex][name] = value;
    setFormData({
      ...formData,
      chapters: updatedChapters,
    });
  };

  const addChapter = () => {
    setFormData({
      ...formData,
      chapters: [
        ...formData.chapters,
        {
          title: "",
          subtitle: "",
          lessons: [{ content: "" }],
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData:", formData); // Log the formData to check its content

    try {
      const response = await axios.post(
        "http://localhost:5000/courses/create",
        {
          name: formData.name,
          description: formData.description,
          content: formData.chapters.map((chapter) => ({
            title: chapter.title,
            subtitle: chapter.subtitle,
            lessons: chapter.lessons.map((lesson) => ({
              content: lesson.content,
            })),
          })),
        }
      );

      console.log("Course created successfully:", response.data);
      // Add any additional logic you need after successful creation
    } catch (error) {
      console.error("Error creating course:", error);
      // Handle error scenarios here
    }
  };

  return (
    <>
      <div className="container-dash">
        <Sidebar />
        <div className="main-dash">
          <div className="toggle">
          <Icons.Bars size={24}/>
          </div>
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div className="mb-4">
              {formData.chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex}>
                  <label className="block text-gray-700 font-bold mb-2">
                    Chapter Title:
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={chapter.title}
                    onChange={(e) => handleChapterChange(e, chapterIndex)}
                    required
                    className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <label className="block text-gray-700 font-bold mb-2">
                    Chapter Subtitle:
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={chapter.subtitle}
                    onChange={(e) => handleChapterChange(e, chapterIndex)}
                    required
                    className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  {chapter.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex}>
                      <label className="block text-gray-700 font-bold mb-2">
                        Lesson Content:
                      </label>
                      <textarea
                        name="content"
                        value={lesson.content}
                        onChange={(e) =>
                          handleLessonChange(e, chapterIndex, lessonIndex)
                        }
                        required
                        className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      ></textarea>
                    </div>
                  ))}
                </div>
              ))}
              <button
                type="button"
                className="border border-black bg-white text-black px-4 py-2 rounded hover:bg-blue-700 mr-2"
                onClick={addChapter}
              >
                Add Chapter
              </button>
            </div>
            <button
              type="submit"
              className="border border-black bg-white text-black px-4 py-2 rounded"
            >
              Create Course
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
