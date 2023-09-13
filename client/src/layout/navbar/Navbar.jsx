import React, { useRef, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "../../input.css";
import Logo from "../../assets/images/LearnovaLogo2.png";
import './Navbar.css'
import Icons from '../../assets/icons/icons'
import Cookies from "js-cookie";

export default function Navbar() {
  const navRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = Cookies.get("token");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const showNavbar = () =>{
    navRef.current.classList.toggle("responsive_nav");
  }

  return (
    <>
      <header className="flex items-center justify-between py-[20px] px-[40px] bg-transparent text-white w-full z-[999] absolute top-0">
        <div className="logo">
        <Link
          to="/"
          className=""
        >
          <img src={Logo} alt="learnova" width="170px" />
        </Link>
        </div>
        <nav ref={navRef}>
          <Link
            to="/allCourses"
            className="block md:inline-block hover:text-blue-200 px-3 py-2 hover:text-orange"
          >
            All Courses
          </Link>
          <Link
            to="/instructors"
            className="block md:inline-block hover:text-blue-200 px-3 py-2 hover:text-orange"
          >
            Instructors
          </Link>
          <Link
            to="/pricing"
            className="block md:inline-block hover:text-blue-200 px-3 py-2 hover:text-orange"
          >
            Pricing & FAQ
          </Link>
          <Link
            to="/contact"
            className="block md:inline-block hover:text-blue-200 px-3 py-2 hover:text-orange"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="block md:inline-block hover:text-blue-200 px-3 py-2 hover:text-orange"
          >
            About
          </Link>
          {isLoggedIn ? (
          <Link
            to="/profile"
            className="block md:inline-block bg-orange rounded-full px-6 py-2 ml-4 font-bold"
          >
            MY ACCOUNT
          </Link>
          ) : (
            <Link
            to="/login"
            className="block md:inline-block bg-orange rounded-full px-6 py-2 ml-4 font-bold"
          >
            LOGIN
          </Link>
          )}
          <button className="nav-btn nav-close-btn" onClick={showNavbar}><Icons.Close className="text-orange"/></button>
          </nav>

          <button className="nav-btn" onClick={showNavbar}><Icons.Bars className="text-orange"/></button>
      </header>

      <Outlet />
    </>
  );
}
