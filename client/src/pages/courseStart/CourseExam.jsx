import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/sidebars/StudentSideBar';
import Icons from '../../assets/icons/icons';
import UserInfo from '../../components/users/UserInfo';
import { Link } from 'react-router-dom';

export default function CourseExam() {
  const user = UserInfo();
  const { id: courseId } = useParams();
  const [course, setCourse] = useState({});
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [questionsClosed, setQuestionsClosed] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [result, setResult] = useState(null); // 'success', 'failed', or null
  const [submitted, setSubmitted] = useState(false); // Track if answers are submitted

  useEffect(() => {
    if (user && user._id) {
      async function fetchCourseAndQuestions() {
        try {
          // Fetch course details by ID
          const courseResponse = await axios.get(`http://localhost:5000/courses/${courseId}`);
          setCourse(courseResponse.data);

          // Fetch questions for the course
          const questionsResponse = await axios.get(`http://localhost:5000/random/${courseId}`);
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
    if (questionsClosed) {
      return;
    }

    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitAnswers = async () => {
    const updatedScore = userAnswers.reduce((acc, answer, index) => {
      if (answer !== undefined && questions[index].options[answer].isTrue) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setScore(updatedScore);
    setQuestionsClosed(true);
    setSubmitted(true); // Mark answers as submitted

    // Calculate the percentage and result
    const calculatedPercentage = (updatedScore / questions.length) * 100;
    setPercentage(calculatedPercentage);

    if (calculatedPercentage > 50) {
      setResult('success');
    } else {
      setResult('failed');
    }

    // Save the user's score in the database
    await axios.put(`http://localhost:5000/${user._id}/examScore/${courseId}`, {
      score: updatedScore,
    });
  };

  const handleTryAgain = async () => {
    // Reset the state to allow the user to try the exam again
    setQuestionsClosed(false);
    setScore(0);
    setPercentage(0);
    setResult(null);
    setSubmitted(false); // Reset submission status
    setUserAnswers(new Array(userAnswers.length).fill(undefined));

    // Delete the user's score from the database if it exists
    await axios.delete(`http://localhost:5000/${user._id}/examScore/${courseId}`);
    window.location.reload();
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
          <div className="dash-container">
          <div className='course-quiz'>
            <h1 className="text-2xl font-bold mb-5">Questions for Course: {course.name || 'Loading...'}</h1>
            <ul className="list-disc pl-4">
              {questions.map((question, questionIndex) => (
                <li key={question._id} className="mb-4">
                  <h3 className="text-lg font-semibold">{question.questionText}</h3>
                  <ul className="list-disc pl-4">
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex} className="flex items-cnjenter space-x-2">
                        <input
                          type="radio"
                          checked={userAnswers[questionIndex] === optionIndex}
                          onChange={() => handleSelectAnswer(questionIndex, optionIndex)}
                          className="h-5 w-5 text-blue-500"
                          disabled={questionsClosed}
                        />
                        <span>{option.text}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            {submitted ? (
              <div>
                <p className="mt-2">Score: {score}</p>
                <p className="mt-2">Percentage: {percentage.toFixed(2)}%</p>
                {result === 'success' ? (
                    <div>
                    <p className="text-green-500 text-xl font-semibold mt-4">Success!</p>
                    <Link
                      to={`/${courseId}/certificate/${user._id}`}
                      className="bg-blue text-white px-4 py-2 mt-4 rounded-md hover:bg-blue"
                    >
                      View Certificate
                    </Link>
                  </div>
                ) : (
                  <div>
                    <p className="text-red-500 text-xl font-semibold mt-4">Failed</p>
                    <button
                      onClick={handleTryAgain}
                      className="bg-blue text-white px-4 py-2 mt-4 rounded-md hover:bg-blue"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSubmitAnswers}
                className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-green-600"
                disabled={userAnswers.includes(undefined) || questionsClosed}
              >
                Submit Answers
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
