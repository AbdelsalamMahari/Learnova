import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Icons from "../../assets/icons/icons";
import UserInfo from "../users/UserInfo";

export default function Sidebar({course}) {
  const user = UserInfo();
  const { id } = useParams(); // Get the id from URL params

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

  return (
    <div className="navigation-dash-st">
      <ul>
        <div className="bg-blue">
        <li>
          <Link to="/">
            <span className="title text-xl text-white">{course ? course.name : "Course Name Loading..."}</span>
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
