import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebars/InstructorSideBar";
import Icons from "../../assets/icons/icons";
import UserInfo from '../../components/users/UserInfo';

export default function CreateCourse() {
  const user = UserInfo();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    instructor: "",
    chapters: [
      {
        title: "",
        subtitles: [],
        lessons: [{ content: "", image: null }],
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

  const handleTitleChange = (e, chapterIndex) => {
    const { value } = e.target;
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].title = value;
    setFormData({
      ...formData,
      chapters: updatedChapters,
    });
  };

  const handleSubtitleChange = (e, chapterIndex, subtitleIndex) => {
    const { name, value } = e.target;
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].subtitles[subtitleIndex] = value;
    updatedChapters[chapterIndex].lessons[subtitleIndex].subtitle = value;
  
    console.log("Updated Chapters:", updatedChapters);
  
    setFormData({
      ...formData,
      chapters: updatedChapters,
    });
  };

  const handleImageChange = (e, chapterIndex, lessonIndex) => {
    const file = e.target.files[0]; 
    const fileName = file.name; 

    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].lessons[lessonIndex].image = fileName; 

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
          subtitles: [],
          lessons: [], 
        },
      ],
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData:", formData);
  
    const formDataToSend = {
      name: formData.name,
      description: formData.description,
      instructor: user._id,
      content: formData.chapters.map((chapter) => ({
        title: chapter.title,
        lessons: chapter.lessons.map((lesson) => ({
          content: lesson.content,
          image: lesson.image,
          subtitle: lesson.subtitle,
        })),
      })),
    };
  
    try {
      const response = await axios.post("http://localhost:5000/courses/create", formDataToSend);
  
      console.log("Course created successfully:", response.data);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };
  

  return (
    <>
      <div className="container-dash">
        <Sidebar />
        <div className="main-dash">
          <div className="toggle">
            <Icons.Bars size={24} />
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-4"
            encType="multipart/form-data"
          >
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
                    onChange={(e) =>
                      handleTitleChange(e, chapterIndex)
                    }
                    required
                    className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  {chapter.subtitles.map((subtitle, subtitleIndex) => (
                    <div key={subtitleIndex}>
                      <label className="block text-gray-700 font-bold mb-2">
                        Subtitle:
                      </label>
                      <input
                        type="text"
                        name="subtitle"
                        value={subtitle}
                        onChange={(e) =>
                          handleSubtitleChange(
                            e,
                            chapterIndex,
                            subtitleIndex
                          )
                        }
                        required
                        className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <label className="block text-gray-700 font-bold mb-2">
                        Lesson Content:
                      </label>
                      <textarea
                        name="content"
                        value={
                          chapter.lessons[subtitleIndex]
                            ? chapter.lessons[subtitleIndex].content
                            : ""
                        }
                        onChange={(e) =>
                          handleLessonContentChange(
                            e,
                            chapterIndex,
                            subtitleIndex
                          )
                        }
                        required
                        className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      ></textarea>

             
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Lesson Image:
                        </label>
                        <input
                        name="image"
                          type="file"
                          
                          onChange={(e) => handleImageChange(e, chapterIndex, lessonIndex)}
                          className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="border border-black bg-white text-black px-4 py-2 rounded hover:bg-blue-700 mr-2"
                    onClick={() => addSubtitle(chapterIndex)}
                  >
                    Add Subtitle and Content
                  </button>
                  <button
                    type="button"
                    className="border border-red-500 text-red-500 px-2 py-1 rounded mt-2"
                    onClick={() => removeChapter(chapterIndex)}
                  >
                    Remove Chapter
                  </button>
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
