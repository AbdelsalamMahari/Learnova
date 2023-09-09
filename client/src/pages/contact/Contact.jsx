import React from "react";
import "./Contact.css";
import Navbar from "../../layout/navbar/Navbar"

export default function Contact() {
  return (
    <>
      <div className="scroll-container">
        <section className="backdrop-image-contact">
          <Navbar/>
          <div className="backdrop-section-contact">
            <div className=" px-[30px]">
              <h1 className="lg:text-6xl font-bold text-white my-8">Get in Touch</h1>
              <p className="text-lg text-white">Your portal to a world of knowledge and growth. Explore, learn, and thrive with Learnova</p>
              </div>
          </div>
        </section>
        <section className="h-screen">hii</section>
      </div>
    </>
  );
}
