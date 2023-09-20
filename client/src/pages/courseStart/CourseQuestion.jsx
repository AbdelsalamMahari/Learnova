import React from 'react'
import SideBar from "../../components/sidebars/StudentSideBar";
import Icons from "../../assets/icons/icons";

export default function CourseQuestion() {
  return (
    <>
    <div className="container-dash-st">
    <SideBar />
    <div className="main-dash-st">
      <div className="topbar">
        <div className="toggle">
          <Icons.Bars size={24} />
        </div>
      </div>
      <div className='course-quiz'>
        enter
      </div>
    </div>
  </div>
  </>
  )
}
