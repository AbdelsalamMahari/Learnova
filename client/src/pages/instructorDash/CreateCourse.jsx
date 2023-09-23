import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebars/InstructorSideBar";
import Icons from "../../assets/icons/icons";
import UserInfo from "../../components/users/UserInfo";

export default function CreateCourse() {
  const user = UserInfo();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    instructor: "",
    backdrop: "",
    Price: "",
    category: "",
    chapters: [
      {
        title: "",
        subtitles: [],
        lessons: [{ content: "", image: null }],
      },
    ],
  });

  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);

  const handleChangeCategory = (e) => {
    const { name, value } = e.target;
    if (value === "Other") {
   
      setShowCustomCategoryInput(true);
    } else {
      setShowCustomCategoryInput(false);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const handleCustomCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBackdrop = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      setSelectedFile(file);
      setSelectedFileName(fileName);
    }
  };

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
    setFormData({
      ...formData,
      chapters: updatedChapters,
    });
  };

  const handleLessonContentChange = (e, chapterIndex, subtitleIndex) => {
    const { name, value } = e.target;
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].lessons[subtitleIndex].content = value;
    setFormData({
      ...formData,
      chapters: updatedChapters,
    });
  };

  const handleImageChange = (e, chapterIndex, subtitleIndex) => {
    const file = e.target.files[0];
    const fileName = file.name;
    const updatedImageFiles = [...selectedImageFiles];
    updatedImageFiles.push({
      chapterIndex,
      subtitleIndex,
      file,
    });
    setSelectedImageFiles(updatedImageFiles);
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].lessons[subtitleIndex].image = fileName;
    updatedChapters[chapterIndex].lessons[subtitleIndex].subtitle =
      formData.chapters[chapterIndex].subtitles[subtitleIndex];
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

  const removeChapter = (chapterIndex) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters.splice(chapterIndex, 1);
    setFormData({
      ...formData,
      chapters: updatedChapters,
    });
  };

  const addSubtitle = (chapterIndex) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].subtitles.push("");
    updatedChapters[chapterIndex].lessons.push({
      content: "",
      image: null,
      subtitle: "",
    });
    setFormData({
      ...formData,
      chapters: updatedChapters,
    });
  };

  const removeSubtitle = (chapterIndex, subtitleIndex) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[chapterIndex].subtitles.splice(subtitleIndex, 1);
    updatedChapters[chapterIndex].lessons.splice(subtitleIndex, 1);
    setFormData({
      ...formData,
      chapters: updatedChapters,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataBackdrop = new FormData();
    formDataBackdrop.append("backdrop", selectedFile);

    const backdropResponse = axios.post(
      "http://localhost:5000/courses/courseBackdrop",
      formDataBackdrop,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    for (const imageFile of selectedImageFiles) {
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile.file);

      try {
        const imageUploadResponse = await axios.post(
          "http://localhost:5000/image/upload",
          imageFormData
        );

        console.log("Image uploaded successfully:", imageUploadResponse.data);
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }
    const formDataToSend = {
      name: formData.name,
      description: formData.description,
      backdrop: selectedFileName,
      Price: formData.Price,
      instructor: user._id,
      category: showCustomCategoryInput
        ? formData.customCategory 
        : formData.category,
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
      console.log(formDataToSend);
      const response = await axios.post(
        "http://localhost:5000/courses/create",
        formDataToSend
      );

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
              <label className="block text-gray-700 font-bold mb-2">
                Category:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChangeCategory}
                required
                className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a category</option>
                <option value="Science">Science</option>
                <option value="Math">Math</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Finance">Finance</option>
                <option value="Language">Language</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {showCustomCategoryInput && (
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Custom Category:
                </label>
                <input
                  type="text"
                  name="customCategory"
                  value={formData.customCategory}
                  onChange={handleCustomCategoryChange}
                  required
                  className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Course image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBackdrop}
                required
                className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              ></input>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Price:
              </label>
              <input
                type="text"
                name="Price"
                value={formData.Price}
                onChange={handleChange}
                required
                className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {formData.chapters.map((chapter, chapterIndex) => (
              <div key={chapterIndex}>
                <label className="block text-gray-700 font-bold mb-2">
                  Chapter Title:
                </label>
                <input
                  type="text"
                  name="title"
                  value={chapter.title}
                  onChange={(e) => handleTitleChange(e, chapterIndex)}
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
                        handleSubtitleChange(e, chapterIndex, subtitleIndex)
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
                    <label className="block text-gray-700 font-bold mb-2">
                      Lesson Image:
                    </label>
                    <input
                      name="image"
                      type="file"
                      onChange={(e) =>
                        handleImageChange(e, chapterIndex, subtitleIndex)
                      }
                      className="w-6/12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      className="border border-red-500 text-red-500 px-2 py-1 rounded mt-2"
                      onClick={() =>
                        removeSubtitle(chapterIndex, subtitleIndex)
                      }
                    >
                      Remove Subtitle
                    </button>
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
