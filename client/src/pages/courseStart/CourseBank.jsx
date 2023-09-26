import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../../components/sidebars/StudentSideBar";
import Icons from "../../assets/icons/icons";
import UserInfo from "../../components/users/UserInfo";
import { Link } from "react-router-dom";

export default function CourseBank() {
  const user = UserInfo();
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, [id]);

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
            <h2>Questions for Course </h2>
            <ul>
              {questions.map((questions, index) => (
                <li key={index}>
                  {questions.questions.map((question, questionIndex) => (
                    <div key={question._id}>
                      <p>
                        <strong>Question {questionIndex + 1}:</strong>{" "}
                        {question.questionText}
                      </p>
                      <p>
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
