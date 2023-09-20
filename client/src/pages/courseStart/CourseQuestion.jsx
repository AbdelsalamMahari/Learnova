import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/sidebars/StudentSideBar';
import Icons from '../../assets/icons/icons';
import UserInfo from '../../components/users/UserInfo';

export default function CourseQuestion() {
  const user = UserInfo();
  const { id: courseId } = useParams();
  const [course, setCourse] = useState({});
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (user && user._id) {
      async function fetchCourseAndQuestions() {
        try {
          // Fetch course details by ID
          const courseResponse = await axios.get(`http://localhost:5000/courses/${courseId}`);
          setCourse(courseResponse.data);

          // Fetch questions for the course
          const questionsResponse = await axios.get(`http://localhost:5000/questions/course/${courseId}`);
          const filteredQuestions = questionsResponse.data.filter((question) => !hasBeenAnswered(question._id)); // Filter out answered questions
          setQuestions(filteredQuestions);

          // Fetch user's score for this course from the database
          const userScoreResponse = await axios.get(`http://localhost:5000/${user._id}/score/${courseId}`);
          setScore(userScoreResponse.data.score);
        } catch (error) {
          console.error(error);
        }
      }

      fetchCourseAndQuestions();
    }
  }, [courseId, user]);

  const handleSelectAnswer = (questionIndex, optionIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  const checkAnswer = async (questionIndex) => {
    if (userAnswers[questionIndex] === undefined) {
      return;
    }

    const selectedOptionIndex = userAnswers[questionIndex];
    const selectedOption = questions[questionIndex].options[selectedOptionIndex];

    if (selectedOption.isTrue) {
      const updatedScore = score + 1;
      setScore(updatedScore);

      // Mark the question as answered
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].answered = true;
      setQuestions(updatedQuestions);

      // Store that this question has been answered correctly in localStorage
      markAsAnswered(questions[questionIndex]._id);
      
      // Update the user's score in the database
      await axios.put(`http://localhost:5000/${user._id}/score/${courseId}`, {
        score: updatedScore,
      });
    }
  };

  const remainingQuestions = questions.slice(0, 5);

  // Helper function to mark a question as answered in localStorage
  const markAsAnswered = (questionId) => {
    const answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions')) || [];
    answeredQuestions.push(questionId);
    localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
  };

  // Helper function to check if a question has been answered
  const hasBeenAnswered = (questionId) => {
    const answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions')) || [];
    return answeredQuestions.includes(questionId);
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
            
            {score >= 5 ? (
              <p className="text-xl text-green-500 font-semibold mb-4">Ready for your exam!</p>
            ) : (
              <ul className="list-disc pl-4">
                {remainingQuestions.map((question, questionIndex) => (
                  <li key={question._id} className="mb-4">
                    {hasBeenAnswered(question._id) ? (
                      <p className="text-green-500">This question has been answered correctly.</p>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold">{question.questionText}</h3>
                        <ul className="list-disc pl-4">
                          {question.options.map((option, optionIndex) => (
                            <li key={optionIndex} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                checked={userAnswers[questionIndex] === optionIndex}
                                onChange={() => handleSelectAnswer(questionIndex, optionIndex)}
                                className="h-5 w-5 text-blue-500"
                                disabled={hasBeenAnswered(question._id)}
                              />
                              <span>{option.text}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => checkAnswer(questionIndex)}
                          className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-green-600"
                          disabled={userAnswers[questionIndex] === undefined}
                        >
                          Check Answer
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-2">Score: {score}</p>
          </div>
        </div>
      </div>
    </>
  );
}
