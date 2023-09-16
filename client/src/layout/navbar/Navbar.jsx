import React, { useRef, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "../../input.css";
import "./Navbar.css";
import Icons from "../../assets/icons/icons";
import Cookies from "js-cookie";
import { isAdminUser } from "../../utils/Admin/authUtils";
import { isInstructorUser } from "../../utils/Instructor/authUtils";

export default function Navbar({ className, imgSrc }) {
  const navRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = Cookies.get("token");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  const token = Cookies.get("token");
  const isAdmin = isAdminUser(token);
  const isInstructor = isInstructorUser(token);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <>
      <header
        className={`${className} flex items-center justify-between py-[20px] px-[40px]  w-full z-[999] absolute top-0`}
      >
        <div className="logo">
          <Link to="/" className="">
            <img src={imgSrc} alt="learnova" width="170px" />
          </Link>
        </div>
        <nav className="flex" ref={navRef}>
          {isAdmin && (
            <Link
              to="/adminDash"
              className=" px-3 py-2 hover:text-orange"
            >
              <Icons.Admin size={24}/> 
            </Link>
          )}
          {isInstructor && (
            <Link
              to="/intructorDash"
              className=" px-3 py-2 hover:text-orange"
            >
              Manage Course
            </Link>
          )}
          <Link
            to="/allCourses"
            className=" px-3 py-2 hover:text-orange"
          >
            All Courses
          </Link>
          <Link
            to="/instructors"
            className=" px-3 py-2 hover:text-orange"
          >
            Instructors
          </Link>
          <Link
            to="/pricing"
            className=" px-3 py-2 hover:text-orange"
          >
            Pricing & FAQ
          </Link>
          <Link
            to="/contact"
            className=" px-3 py-2 hover:text-orange"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className=" px-3 py-2 hover:text-orange"
          >
            About
          </Link>
          {isLoggedIn ? (
            <Link
              to="/profile"
              className=" bg-orange rounded-full px-6 py-2 ml-4 font-bold"
            >
              MY ACCOUNT
            </Link>
          ) : (
            <Link
              to="/login"
              className=" bg-orange rounded-full px-6 py-2 ml-4 font-bold"
            >
              LOGIN
            </Link>
          )}
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <Icons.Close className="text-orange" />
          </button>
        </nav>

        <button className="nav-btn" onClick={showNavbar}>
          <Icons.Bars className="text-orange" />
        </button>
      </header>

      <Outlet />
    </>
  );
}
