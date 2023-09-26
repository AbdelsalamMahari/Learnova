import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Icons from "../../assets/icons/icons";
import axios from "axios";
import UserInfo from "../users/UserInfo";

export default function Sidebar({course}) {
  const user = UserInfo();
  const { id } = useParams(); // Get the id from URL params
  const [isExamsUnlocked, setIsExamsUnlocked] = useState(false);

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
    if (user && user._id) {
      axios
        .get(`http://localhost:5000/subscriptions/${user._id}`)
        .then((response) => {
          const data = response.data;

          // Check if the user has a monthly plan
          if (data.plans.includes("annual") || data.plans.includes("monthly")) {
            setIsExamsUnlocked(true);
            console.log(data.plans)
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);
  return (
    <div className="navigation-dash-st">
      <ul>
        <li>
          <Link to="/">
            <span className="title text-xl">{course ? course.name : "Course Name Loading..."}</span>
          </Link>
        </li>

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
            <Link to={`/exam/${id}`}>
              <span className="icon">
                <Icons.Exam size={30} />
              </span>
              <span className="title">Exams</span>
            </Link>
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
