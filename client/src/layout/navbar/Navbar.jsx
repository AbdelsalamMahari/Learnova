import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "../../input.css";
import Logo from "../../assets/images/LearnovaLogo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between p-5 bg-transparent fixed w-full z-50">
        <div className="flex md:hidden">
          <button id="hamburger" onClick={toggleMenu}>
            <img
              className={`toggle ${menuOpen ? "hidden" : "block"}`}
              src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
              width="40"
              height="40"
              alt="menu"
            />
            <img
              className={`toggle ${menuOpen ? "block" : "hidden"}`}
              src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
              width="40"
              height="40"
              alt="menu"
            />
          </button>
        </div>
        <Link
          to="/"
          className="toggle hidden md:flex w-full md:w-auto text-right"
        >
          <img src={Logo} alt="learnova" width="170px" />
        </Link>
        <div
          className={`toggle ${
            menuOpen ? "block" : "hidden"
          } w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none`}
        >
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
            className="block md:inline-block text-white bg-[#FFA500] rounded-full px-6 py-2 mx-4 font-bold"
          >
            START LEARNING
          </Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
