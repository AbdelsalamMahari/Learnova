import React, { useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import "../../input.css";
import Logo from "../../assets/images/LearnovaLogo.png";
import './Navbar.css'
import Icons from '../../assets/icons/icons'

export default function Navbar() {
  const navRef = useRef();

  const showNavbar = () =>{
    navRef.current.classList.toggle("responsive_nav");
  }

  return (
    <>
      <header className="flex items-center justify-between p-5 bg-transparent w-full z-[999] absolute top-0">
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
            className="block md:inline-block text-white hover:text-blue-200 px-3 py-2"
          >
            All Courses
          </Link>
          <Link
            to="/instructors"
            className="block md:inline-block text-white hover:text-blue-200 px-3 py-2"
          >
            Instructors
          </Link>
          <Link
            to="/pricing"
            className="block md:inline-block text-white hover:text-blue-200 px-3 py-2"
          >
            Pricing & FAQ
          </Link>
          <Link
            to="/contact"
            className="block md:inline-block text-white hover:text-blue-200 px-3 py-2"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="block md:inline-block text-white hover:text-blue-200 px-3 py-2"
          >
            About
          </Link>
          <Link
            to="/about"
            className="block md:inline-block text-white bg-orange rounded-full px-6 py-2 mx-4 font-bold"
          >
            START LEARNING
          </Link>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}><Icons.Close className="text-orange"/></button>
          </nav>

          <button className="nav-btn" onClick={showNavbar}><Icons.Bars className="text-orange"/></button>
      </header>

      <Outlet />
    </>
  );
}
