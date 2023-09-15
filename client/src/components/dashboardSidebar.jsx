import React, { useEffect, useState } from 'react';
import { HiArrowsRightLeft } from 'react-icons/hi2';

function SidebarWithToggle({ isSidebarActive, toggleSidebar }) {
  useEffect(() => {
    let list = document.querySelectorAll(".navigation-dash li");

    function activeLink() {
      list.forEach((item) => {
        item.classList.remove("hovered");
      });
      this.classList.add("hovered");
    }

    list.forEach((item) => item.addEventListener("mouseover", activeLink));
  }, []);

  const handleToggleClick = () => {
    toggleSidebar(); 
  };

  return (
    <div>
      <div className={`navigation-dash ${isSidebarActive ? 'active' : ''}`}>
        <ul>
          <li>
            <a href="/">
              <span className="icon">
                <ion-icon name="logo-apple"></ion-icon>
              </span>
              <span className="title">Teacher Name</span>
            </a>
          </li>
          <li>
            <a href="/TeacherDashboard">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
            </a>
          </li>
        
          <li>
            <a href="/CreateCourse">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Create New Course</span>
            </a>
          </li>
        </ul>
        <div className="toggle" onClick={handleToggleClick}>
          <HiArrowsRightLeft name="menu-outline" className="SideBarToggle" />
        </div>
      </div>
      <div className={`main-dash ${isSidebarActive ? 'active' : ''}`}>
 
      </div>
    </div>
  );
}

export default SidebarWithToggle;
