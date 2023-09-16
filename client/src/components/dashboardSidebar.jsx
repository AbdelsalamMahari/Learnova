import React, { useEffect } from 'react';
import { HiArrowsRightLeft } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

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
            <Link to="/">
              <span className="icon">
                <ion-icon name="logo-apple"></ion-icon>
              </span>
              <span className="title">Teacher Name</span>
            </Link>
          </li>
          <li>
            <Link to="/dash">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
        
          <li>
            <Link to="/dash/createCourse">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Create New Course</span>
            </Link>
          </li>
          <li>
            <Link to="/dash/dashQuestion">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Create Questions</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Return</span>
            </Link>
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
