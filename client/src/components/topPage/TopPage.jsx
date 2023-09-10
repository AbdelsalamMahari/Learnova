import React from "react";
import "./TopPage.css";
import Navbar from "../../layout/navbar/Navbar"

export default function TopPage({ title, backgroundImageUrl }) {
    const backdropStyle = {
        "--background-image-url": `url(${backgroundImageUrl})`,
      };
  return (
    <>
      <div className="scroll-container">
        <section className="backdrop-image-topPage" style={backdropStyle}>
          <Navbar/>
          <div className="backdrop-section-topPage">
            <div className=" px-[30px]">
              <h1 className="lg:text-6xl font-bold text-white my-8">{title}</h1>
              <p className="text-lg text-white">Your portal to a world of knowledge and growth. Explore, learn, and thrive with Learnova</p>
              </div>
          </div>
        </section>
        <section className="h-screen">hii</section>
      </div>
    </>
  );
}
