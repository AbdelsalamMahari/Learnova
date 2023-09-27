import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../../components/sidebars/StudentSideBar";
import Icons from "../../assets/icons/icons";
import UserInfo from "../../components/users/UserInfo";

export default function CourseBank() {
  const user = UserInfo();
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [courseInfo, setCourseInfo] = useState({}); // Added state for course info

  useEffect(() => {
    if (user && user._id) {
      // Check if the user has purchased this course
      async function checkPurchase() {
        try {
          const hasPurchasedResponse = await axios.post(
            "http://localhost:5000/purchases/check",
            {
              userId: user._id,
              courseId: id,
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
  }, [user, id, navigate]);

  useEffect(() => {
    // Fetch all questions for the given course ID
    async function fetchQuestions() {
      try {
        const response = await axios.get(
          `http://localhost:5000/bank/getAllQuestion/${id}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, [id]);

  useEffect(() => {
    // Fetch course information using the provided id
    async function fetchCourseInfo() {
      try {
        const response = await axios.get(
          `http://localhost:5000/courses/${id}`
        );
        setCourseInfo(response.data);
      } catch (error) {
        console.error("Error fetching course information:", error);
      }
    }

    fetchCourseInfo();
  }, [id]);

  return (
    <>
      <div className="container-dash-st">
        <SideBar course={courseInfo}/>
        <div className="main-dash-st">
          <div className="topbar">
            <div className="toggle">
              <Icons.Bars size={24} />
            </div>
          </div>
          <div className="dash-container">
            <h2 className="mb-10 text-xl">Bank Questions for {courseInfo.name} Course</h2>
            <ul>
              {questions.map((questionSet, index) => (
                <li key={index}>
                  {questionSet.questions.map((question, questionIndex) => (
                    <div key={question._id} className="mb-5">
                      <p>
                        <strong>Question {questionIndex + 1}:</strong>{" "}
                        {question.questionText}
                      </p>
                      <p className="font-bold text-green-600">
                        <strong>Answer:</strong> {question.answer}
                      </p>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
