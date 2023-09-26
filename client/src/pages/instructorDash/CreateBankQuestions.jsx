import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebars/InstructorSideBar";
import Icons from "../../assets/icons/icons";
import axios from "axios";

export default function CreateBankQuestions() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionsList, setQuestionsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalQuestionText, setModalQuestionText] = useState("");
  const [modalAnswer, setModalAnswer] = useState("");
  const [questionToUpdateId, setQuestionToUpdateId] = useState("");
  const [questionToUpdateIndexId, setQuestionToUpdateIndexId] = useState("");
  const { id } = useParams();

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/bank/getAllQuestion/${id}`
      );
      setQuestionsList(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleUpdate = (questionId, questionIndex, questionText, answer) => {
    setQuestionToUpdateId(questionId);
    setQuestionToUpdateIndexId(questionIndex);
    setModalQuestionText(questionText);
    setModalAnswer(answer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/bank/updateQuestion/${questionToUpdateId}`, {
        questionId: questionToUpdateIndexId,
        questionText: modalQuestionText,
        answer: modalAnswer,
      });

      setModalQuestionText("");
      setModalAnswer("");
      setIsModalOpen(false);
      fetchQuestions();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDelete = async (questionId, questionIndex) => {
    try {
      await axios.delete(
        `http://localhost:5000/bank/deleteQuestion/${questionId}`,
        {
          data: { questionIndex },
        }
      );

      fetchQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/bank/save", {
        courseId: id,
        questionText: question,
        answer,
      });

      setQuestion("");
      setAnswer("");
      fetchQuestions();
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  return (
    <>
    <div className="container-dash">
      <Sidebar />
      <div className="main-dash">
        <div className="topbar">
          <div className="toggle">
            <Icons.Bars size={24} />
          </div>
          <div className="search">
            <label>
              <input type="text" placeholder="Search by course name" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>
        </div>
        <div className="dash-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Question:
              </label>
              <input
                type="text"
                value={question}
                onChange={handleQuestionChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your question"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Answer:
              </label>
              <input
                type="text"
                value={answer}
                onChange={handleAnswerChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter the answer"
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Question
              </button>
            </div>
          </form>
          <div className="mt-[50px]">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {questionsList.map((questionItem, index) =>
                  questionItem.questions.map((question, questionIndex) => (
                    <tr key={questionIndex}>
                      <td>{question.questionText}</td>
                      <td>{question.answer}</td>
                      <td className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdate(
                              questionItem._id,
                              question._id,
                              question.questionText,
                              question.answer
                            )
                          }
                          className="bg-green-500 p-2 rounded-md text-white"
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 p-2 rounded-md text-white"
                          onClick={() =>
                            handleDelete(questionItem._id, question._id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    {/* Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Update Question</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Question:
              </label>
              <input
                type="text"
                value={modalQuestionText}
                onChange={(e) => setModalQuestionText(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your question"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Answer:
              </label>
              <input
                type="text"
                value={modalAnswer}
                onChange={(e) => setModalAnswer(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter the answer"
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
  );
}
