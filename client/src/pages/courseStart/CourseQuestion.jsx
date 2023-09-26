import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/sidebars/StudentSideBar';
import Icons from '../../assets/icons/icons';
import UserInfo from '../../components/users/UserInfo';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function CourseQuestion() {
  const user = UserInfo();
  const navigate = useNavigate(); 
  const { id: courseId } = useParams();
  const [course, setCourse] = useState({});
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (user && user._id) {
      // Check if the user has purchased this course
      async function checkPurchase() {
        try {
          const hasPurchasedResponse = await axios.post(
            "http://localhost:5000/purchases/check",
            {
              userId: user._id,
              courseId: courseId,
            }
          );

          if (!hasPurchasedResponse.data.hasPurchased) {
            // Redirect the user to a page indicating they haven't purchased the course
            navigate(`/nopage`);
          }
        } catch (error) {
          console.error(error);
        }
      }

      checkPurchase();
    }
  }, [user, courseId, navigate]);

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
          setQuestions(shuffleArray(filteredQuestions)); // Shuffle questions initially
          
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

    // Display a success message
    setSuccessMessage('Correct answer!');

    // Update the user's score in the database
    await axios.put(`http://localhost:5000/${user._id}/score/${courseId}`, {
      score: updatedScore,
    });
  } else {
    // Display an error message in red for the current question
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].error = true;
    setQuestions(updatedQuestions);

    // Set the error message for the current question
    const updatedErrorMessage = 'Incorrect answer! Please try again for this question.';
    setErrorMessage(updatedErrorMessage);

    // Reload the page after a brief delay and reorder the questions
    setTimeout(() => {
      const shuffledQuestions = shuffleArray([...questions]);
      setQuestions(shuffledQuestions);
      // Clear the error message when reloading
      setErrorMessage(null);
      window.location.reload();
    }, 1000); // 1000 milliseconds (1 second) delay
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
        <SideBar course={course}/>
        <div className="main-dash-st mx-auto">
          <div className="topbar">
            <div className="toggle">
              <Icons.Bars size={24} />
            </div>
          </div>
          <div className='course-quiz p-4 bg-white rounded-lg shadow-lg '>
            <div className='bg-blue text-white px-4 py-2 mt-4 rounded-md text-center justify-center'>
            <h1 className="text-2xl font-bold mb-4">Questions for Course: {course.name || 'Loading...'}</h1>
            <p className="mt-2">Score: {score}</p>
            </div>
            {score >= 5 ? (
              <p className=" text-2xl font-bold text-center text-green-500 bg-gray-200 rounded-md p-4 px-4 py-2 mt-4">Ready for your exam!</p>
            ) : (
              <ul className="list-disc pl-10 p-8 ">
               {remainingQuestions.map((question, questionIndex) => (
  <li key={question._id} className={`mb-4 ${question.error ? 'text-red-500' : ''}`}>
    {hasBeenAnswered(question._id) ? (
      <p className="text-green-500">{successMessage}</p>
    ) : (
      <>
        <h3 className="text-lg font-semibold">{question.questionText}</h3>
        {question.error && (
          <p className="text-red-500">{errorMessage}</p>
        )}
         <div className="bg-gray-200 rounded-md p-4">
        <ul className="list-disc pl-4 ">
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
          className="bg-blue text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
          disabled={userAnswers[questionIndex] === undefined}
        >
          Check Answer
        </button>
        </div>
      </>
        )}
        </li>
          ))}
              </ul>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}
