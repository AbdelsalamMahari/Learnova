import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icons from "../../assets/icons/icons";
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";
import { Waveform } from '@uiball/loaders'

export default function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);
    }

    getUserInfo();
  }, []);
  useEffect(() => {
    // add hovered class to selected list item
    let list = document.querySelectorAll(".navigation-dash li");

    function activeLink() {
      list.forEach((item) => {
        item.classList.remove("hovered");
      });
      this.classList.add("hovered");
    }

    list.forEach((item) => item.addEventListener("mouseover", activeLink));

    // Menu Toggle
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation-dash");
    let main = document.querySelector(".main-dash");

    toggle.onclick = function () {
      navigation.classList.toggle("active");
      main.classList.toggle("active");
    };
  }, []);
  return (
    <div className="navigation-dash">
      <ul>
      { user ? (
        <li>
          <Link to="/">
            <span className="icon">
              <div className="user border-2">
              <img
                src={
                  user.profilePic
                    ? user.profilePic
                    : "https://img.freepik.com/free-icon/man_318-677829.jpg"
                }
                alt="profile"
              />
              </div>
            </span>
            <span className="title">{user.firstName} {user.lastName}</span>
          </Link>
        </li>
      ) : (
        <div className="flex justify-center items-center">
        <Waveform size={25} color="#fff" />
        </div>
      )}

        <li>
          <Link to="/dash">
            <span className="icon">
              <Icons.Home size={30} />
            </span>
            <span className="title">Home</span>
          </Link>
        </li>

        <li>
          <Link to="/dash/createCourse">
            <span className="icon">
              <Icons.Book size={30} />
            </span>
            <span className="title">Create Course</span>
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
