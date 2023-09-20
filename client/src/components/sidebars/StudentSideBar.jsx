import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Icons from "../../assets/icons/icons";

export default function Sidebar() {
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
        <li>
          <Link to="/">
            <span className="title text-xl">Html/Css</span>
          </Link>
        </li>


        <li>
          <Link to="/">
            <span className="icon">
              <Icons.Home size={30} />
            </span>
            <span className="title">Course Material</span>
          </Link>
        </li>

        <li>
          <Link to="/">
            <span className="icon">
              <Icons.Book size={30} />
            </span>
            <span className="title">Quizzes</span>
          </Link>
        </li>

        <li>
          <Link to="/">
            <span className="icon">
              <Icons.Book size={30} />
            </span>
            <span className="title">Exam</span>
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
