import React, { useEffect, useState } from 'react';

import './TeacherDashboard.css';
import SidebarWithToggle from '../../components/dashboardSidebar'; 


export default function Dash() {
  useEffect(() => {
    let list = document.querySelectorAll('.navigation-dash li');

    function activeLink() {
      list.forEach((item) => {
        item.classList.remove('hovered');
      });
      this.classList.add('hovered');
    }

    list.forEach((item) => item.addEventListener('mouseover', activeLink));

    // Menu Toggle
    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation-dash');
    let main = document.querySelector('.main-dash');

    toggle.onclick = function () {
      navigation.classList.toggle('active');
      main.classList.toggle('active');
    };
  }, []);

  return (
    <div className="container-dash">

      <SidebarWithToggle />

    </div>
  );
}
