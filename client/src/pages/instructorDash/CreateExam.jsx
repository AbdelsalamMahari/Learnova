import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebars/InstructorSideBar";
import Icons from "../../assets/icons/icons";
import { useParams } from 'react-router-dom';

function DashExam() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({
    questionText: '',
    courseId: '',
    options: ['', '', '', ''],
    optionIsTrue: [false, false, false, false],
  });


  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/exams/course/${id}`); // Updated URL
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };  
  
  useEffect(() => {
    fetchQuestions();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleOptionTextChange = (index, event) => {
    const value = event.target.value;
    setQuestion((prevQuestion) => {
      const updatedOptions = [...prevQuestion.options];
      updatedOptions[index] = value;
      return { ...prevQuestion, options: updatedOptions };
    });
  };

  const handleOptionChange = (index) => {
    setQuestion((prevQuestion) => {
      const updatedIsTrue = [...prevQuestion.optionIsTrue];
      updatedIsTrue[index] = !prevQuestion.optionIsTrue[index];
      return { ...prevQuestion, optionIsTrue: updatedIsTrue };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const questionData = {
        questionText: question.questionText,
        courseId: id,
        options: question.options.map((text, index) => ({
          text,
          isTrue: question.optionIsTrue[index],
        })),
      };
      await axios.post('http://localhost:5000/add/exams', questionData); // Updated URL

      setQuestion({
        questionText: '',
        options: ['', '', '', ''],
        optionIsTrue: [false, false, false, false],
      });
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/exams/${id}`); // Updated URL
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-dash">
    <Sidebar />
    <div className="main-dash">
      <div className="toggle">
      <Icons.Bars size={24}/>
      </div>
    <div className="dashboard p-4 space-y-4">
      <div className="question-form border p-4">
        <h2 className="text-xl font-semibold mb-4">Create/Update Exam</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Question Text:</label>
            <input
              type="text"
              name="questionText"
              value={question.questionText}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Options:</label>
            <div className="grid grid-cols-2 gap-2">
              {['a', 'b', 'c', 'd'].map((option, index) => (
                <div key={option} className="flex items-center">
                  <span>{`Option ${option.toUpperCase()}: `}</span>
                  <input
                    type="text"
                    name={`options[${index}]`}
                    value={question.options[index]}
                    onChange={(e) => handleOptionTextChange(index, e)}
                    className="w-full px-2 py-1 border rounded-md"
                    placeholder={`Option ${option.toUpperCase()}`}
                    required
                  />
                  <input
                    type="checkbox"
                    name={`optionIsTrue[${index}]`}
                    checked={question.optionIsTrue[index]}
                    onChange={() => handleOptionChange(index)}
                    className="mx-2"
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue text-black px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Question
            </button>
          </div>
        </form>
      </div>
      <div className="question-list">
        <h2 className="text-xl font-semibold">Question List</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Question Text</th>
              <th className="border px-4 py-2">Options</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q._id} className="text-center">
                <td className="border px-4 py-2">{q.questionText}</td>
                <td className="border px-4 py-2">
                  {q.options.map((option, index) => (
                    <div key={index}>
                      {`Option ${String.fromCharCode(97 + index).toUpperCase()}: ${
                        option.isTrue ? 'True' : 'False'
                      }`}
                    </div>
                  ))}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
}

export default DashExam;