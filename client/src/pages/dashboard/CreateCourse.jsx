import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import SidebarWithToggle from '../../components/dashboardSidebar'; 

export default function CreateCourse() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
    console.log('isSidebarActive:', isSidebarActive);
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructor: '',
    image: '',
    chapters: [
      {
        title: '',
        subtitle: '',
        lessons: [{ content: '' }],
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
          title: '',
          subtitle: '',
          lessons: [{ content: '' }],
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your submission logic here
  };

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <SidebarWithToggle
            isSidebarActive={isSidebarActive}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className={`main-dash ${isSidebarActive ? 'active' : ''}`}>
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
