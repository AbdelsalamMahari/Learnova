import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../../input.css';
import Logo from "../../assets/images/LearnovaLogo.png"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between p-5 bg-blue-600">
        <div className="flex md:hidden">
          <button id="hamburger" onClick={toggleMenu}>
            <img
              className={`toggle ${menuOpen ? 'hidden' : 'block'}`}
              src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
              width="40"
              height="40"
              alt="menu"
            />
            <img
              className={`toggle ${menuOpen ? 'block' : 'hidden'}`}
              src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
              width="40"
              height="40"
              alt="menu"
            />
          </button>
        </div>
        <Link
          to="/"
          className="toggle hidden md:flex w-full md:w-auto px-4 text-right"
        >
          <img src={Logo} alt="learnova" width="150px"/>
        </Link>
        <div
          className={`toggle ${menuOpen ? 'block' : 'hidden'} w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none`}
        >
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
            to=""
            className="block md:inline-block text-white hover:text-blue-200 px-3 py-2"
          >
            Courses
          </Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
