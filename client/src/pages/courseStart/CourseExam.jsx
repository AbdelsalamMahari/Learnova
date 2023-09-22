import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/sidebars/StudentSideBar';
import Icons from '../../assets/icons/icons';
import UserInfo from '../../components/users/UserInfo';

export default function CourseExam() {
  const user = UserInfo();
  const { id: courseId } = useParams();
  const [course, setCourse] = useState({});
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [questionsClosed, setQuestionsClosed] = useState(false); // New state variable

  useEffect(() => {
    if (user && user._id) {
      async function fetchCourseAndQuestions() {
        try {
          // Fetch course details by ID
          const courseResponse = await axios.get(`http://localhost:5000/courses/${courseId}`);
          setCourse(courseResponse.data);

          // Fetch questions for the course
          const questionsResponse = await axios.get(`http://localhost:5000/exams/course/${courseId}`);
          setQuestions(questionsResponse.data);

          // Initialize userAnswers state with empty values
          setUserAnswers(new Array(questionsResponse.data.length).fill(undefined));
        } catch (error) {
          console.error(error);
        }
      }

      fetchCourseAndQuestions();
    }
  }, [courseId, user]);

  const handleSelectAnswer = (questionIndex, optionIndex) => {
    // Do not allow selecting answers if questions are closed
    if (questionsClosed) {
      return;
    }

    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitAnswers = async () => {
    // Calculate the score based on user answers
    const updatedScore = userAnswers.reduce((acc, answer, index) => {
      if (answer !== undefined && questions[index].options[answer].isTrue) {
        return acc + 1;
      }
      return acc;
    }, 0);

    // Update the user's score in the state
    setScore(updatedScore);

    // Update the user's score in the database
    await axios.put(`http://localhost:5000/${user._id}/examScore/${courseId}`, {
      score: updatedScore,
    });

    // Close the questions after submitting
    setQuestionsClosed(true);
  };

  return (
    <>
      <div className="container-dash-st">
        <SideBar />
        <div className="main-dash-st">
          <div className="topbar">
            <div className="toggle">
              <Icons.Bars size={24} />
            </div>
          </div>
          <div className='course-quiz p-4 bg-white rounded-lg shadow-lg'>
            <h1 className="text-2xl font-bold mb-4">Questions for Course: {course.name || 'Loading...'}</h1>
            <ul className="list-disc pl-4">
              {questions.map((question, questionIndex) => (
                <li key={question._id} className="mb-4">
                  <h3 className="text-lg font-semibold">{question.questionText}</h3>
                  <ul className="list-disc pl-4">
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={userAnswers[questionIndex] === optionIndex}
                          onChange={() => handleSelectAnswer(questionIndex, optionIndex)}
                          className="h-5 w-5 text-blue-500"
                          disabled={questionsClosed} // Disable input if questions are closed
                        />
                        <span>{option.text}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubmitAnswers}
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-green-600"
              disabled={userAnswers.includes(undefined) || questionsClosed} // Disable submit button if questions are closed
            >
              Submit Answers
            </button>
            <p className="mt-2">Score: {score}</p>
          </div>
        </div>
      </div>
    </>
  );
}
