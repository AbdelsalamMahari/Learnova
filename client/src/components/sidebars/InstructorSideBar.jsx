import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icons from "../../assets/icons/icons";
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";
import { Waveform } from '@uiball/loaders'

export default function InstructorSidebar() {
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

    let list = document.querySelectorAll(".navigation-dash li");

    function activeLink() {
      list.forEach((item) => {
        item.classList.remove("hovered");
      });
      this.classList.add("hovered");
    }

    list.forEach((item) => item.addEventListener("mouseover", activeLink));

    
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
          <Link to="/intructorDash">
            <span className="icon">
              <Icons.Home size={30} />
            </span>
            <span className="title">Home</span>
          </Link>
        </li>

        <li>
          <Link to="/intructorDash/createCourse">
            <span className="icon">
              <Icons.Create size={30} />
            </span>
            <span className="title">Create Course</span>
          </Link>
        </li>

        <li>
          <Link to="/intructorDash/dashCourses">
            <span className="icon">
              <Icons.Question size={30} />
            </span>
            <span className="title">Create Questions</span>
          </Link>
        </li>

        <li>
          <Link to="/intructorDash/editCourses">
            <span className="icon">
              <Icons.edit size={30} />
            </span>
            <span className="title">Edit Courses</span>
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
