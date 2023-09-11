import React from "react";
import Logo from "../../assets/images/LearnovaColoredLogo.png";

export default function CourseStart() {
  return (
    <>
      <div className="bg-white border-b">
        <div className="px-[30px]">
          <img src={Logo} alt="logo" className="py-2 w-44" />
        </div>
      </div>
      <div className="bg-white h-screen w-64 fixed left-0 overflow-y-auto">
        <div className="bg-orange text-white p-5">HTML5/CSS3 Essentials</div>
        <div className="p-4">
          <ul className="">
            <li className="my-2">
              <a href="/" className="block text-gray-300 hover:text-white">
                Dashboard
              </a>
            </li>
            <li className="my-2">
              <a href="/" className="block text-gray-300 hover:text-white">
                Profile
              </a>
            </li>
            <li className="my-2">
              <a href="/" className="block text-gray-300 hover:text-white">
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
