import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icons from "../../assets/icons/icons";
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";
import { Waveform } from '@uiball/loaders';

export default function AdminSidebar() {
  const imgURL="/usersProfiles/"
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
    let list = document.querySelectorAll(".navigation-admin li");

    function activeLink() {
      list.forEach((item) => {
        item.classList.remove("hovered");
      });
      this.classList.add("hovered");
    }

    list.forEach((item) => item.addEventListener("mouseover", activeLink));

    // Menu Toggle
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation-admin");
    let main = document.querySelector(".main-admin");

    toggle.onclick = function () {
      navigation.classList.toggle("active");
      main.classList.toggle("active");
    };
  }, []);
  return (
    <div className="navigation-admin">
      <ul>
      { user ? (
        <li>
          <Link to="/">
            <span className="icon">
              <div className="user border-2">
              <img
                src={
                  imgURL+user.profilePic
                    ? imgURL+user.profilePic
                    : "https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
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
          <Link to="/adminDash">
            <span className="icon">
              <Icons.Home size={30} />
            </span>
            <span className="title">Home</span>
          </Link>
        </li>

        <li>
          <Link to="/adminDash/requests">
            <span className="icon">
              <Icons.Teacher size={30} />
            </span>
            <span className="title">Requests</span>
          </Link>
        </li>

        <li>
          <Link to="/adminDash">
            <span className="icon">
              <Icons.Users size={30} />
            </span>
            <span className="title">Users</span>
          </Link>
        </li>

        <li>
          <Link to="/adminDash/instructorss">
            <span className="icon">
              <Icons.Users size={30} />
            </span>
            <span className="title">Instructors</span>
          </Link>
        </li>

        <li>
            <Link to="/adminDash/feedback">
            <span className="icon">
                <Icons.Feedback />
                </span>
                <span className="title">Feedbacks</span>
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
