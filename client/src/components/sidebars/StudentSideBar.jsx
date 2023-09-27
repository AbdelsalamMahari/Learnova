import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Icons from "../../assets/icons/icons";
import UserInfo from "../users/UserInfo";

export default function Sidebar({ course }) {
  const user = UserInfo();
  const { id } = useParams(); // Get the id from URL params
  const [userScore, setUserScore] = useState(null);

  useEffect(() => {
    // add hovered class to selected list item
    let list = document.querySelectorAll(".navigation-dash-st li");

    function activeLink() {
      list.forEach((item) => {
        item.classList.remove("hovered");
      });
      this.classList.add("hovered");
    }

    list.forEach((item) => item.addEventListener("mouseover", activeLink));

    // Menu Toggle
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation-dash-st");
    let main = document.querySelector(".main-dash-st");

    toggle.onclick = function () {
      navigation.classList.toggle("active");
      main.classList.toggle("active");
    };
  }, []);

  useEffect(() => {
    if (user?._id) {
      axios
        .get(`http://localhost:5000/${user._id}/score/${id}`)
        .then((response) => {
          setUserScore(response.data.score);
        })
        .catch((error) => {
          console.error("Error fetching user's score:", error);
        });
    }
  }, [user, id]);

  return (
    <div className="navigation-dash-st">
      <ul>
        <div className="bg-blue">
          <li>
            <Link to="/">
              <span className="title text-xl text-white">
                {course ? course.name : "Course Name Loading..."}
              </span>
            </Link>
          </li>
        </div>

        <li>
          <Link to={`/courseMaterial/${id}`}>
            <span className="icon">
              <Icons.Home size={30} />
            </span>
            <span className="title">Course Material</span>
          </Link>
        </li>

        <li>
          <Link to={`/bankQuestion/${id}`}>
            <span className="icon">
              <Icons.Question size={30} />
            </span>
            <span className="title">Bank Questions</span>
          </Link>
        </li>

        <li>
          <Link to={`/questions/${id}`}>
            <span className="icon">
              <Icons.Question size={30} />
            </span>
            <span className="title">Quizzes</span>
          </Link>
        </li>

        <li>
          {userScore === null || userScore <= 2.5  ? (
            <Link className="bg-gray-300 opacity-50">
              <span className="icon">
                <Icons.Lock size={30} />
              </span>
              <span className="title">Exams (Locked)</span>
            </Link>
          ) : (
            <Link to={`/exam/${id}`}>
              <span className="icon">
                <Icons.Exam size={30} />
              </span>
              <span className="title">Exams</span>
            </Link>
          )}
        </li>

        <li>
          <Link to="/">
            <span className="icon">
              <Icons.ArrowLeft size={30} />
            </span>
            <span className="title">Return</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
