import React from "react";
import "./TopPage.css";
import Navbar from "../../layout/navbar/Navbar"
import Logo from "../../assets/images/LearnovaLogo2.png";

export default function TopPage({ title, desc, backgroundImageUrl }) {
    const backdropStyle = {
        "--background-image-url": `url(${backgroundImageUrl})`,
      };
  return (
    <>
      <div className="scroll-container">
        <section className="backdrop-image-topPage" style={backdropStyle}>
          <Navbar imgSrc={Logo} className={"bg-transparent text-white"}/>
          <div className="backdrop-section-topPage">
            <div className=" px-[30px]">
              <h1 className="lg:text-6xl font-bold text-white my-8">{title}</h1>
              <p className="text-lg text-white">{desc}</p>
              </div>
          </div>
        </section>
      </div>
    </>
  );
}
