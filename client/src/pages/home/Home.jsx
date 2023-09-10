import React from "react";
import "./Home.css";
import Navbar from "../../layout/navbar/Navbar";
import Button from "../../components/buttons/button";

export default function Home() {
  return (
    <>
      <div className="scroll-container">
        <section className="backdrop-image">
          <Navbar />
          <div className="backdrop-section">
            <div className="px-[30px]">
              <h1 className="lg:text-6xl font-bold text-white my-8">
                Learning Fuels Creative Thinking
              </h1>
              <p className="text-lg text-white my-8">
                Your portal to a world of knowledge and growth. Explore, learn,
                and thrive with Learnova
              </p>
              <Button text={"START COURSE"}></Button>
            </div>
          </div>
        </section>
        <section className="min-h-screen">
          <div className="flex p-[30px]">
            <div className="w-[35%]">
              <h4>Top Categories</h4>
              <h1 className="lg:text-5xl">Popular Courses</h1>
            </div>
            <div className="w-[45%] border-l-2 border-orange pl-8">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim.
              </p>
            </div>
            <div className="w-[20%]">
              <Button text="VIEW ALL COURSES" className="float-right"></Button>
            </div>
          </div>
          <div className="flex p-[30px] gap-6">
            <div className="flex-1 shadow-2xl">
              <div>
                <img
                  src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/html-400x223.jpg"
                  alt="course1"
                  className="w-full"
                ></img>
              </div>
              <div className="flex flex-col p-5 gap-5 bg-white border">
                <div>
                  <h1 className="lg:text-4xl w-full h-[80px]">
                    HTML5/CSS3 Essentials
                  </h1>
                </div>
                <div>
                  <button className="bg-blue rounded w-full p-1 text-white">
                    See more...
                  </button>
                </div>
                <div>
                  <div class="h-4 bg-gray-300 rounded-full w-full">
                    <div
                      className="h-full bg-orange rounded-full"
                      style={{ width: "20%" }} // Use an object here
                    ></div>
                  </div>
                  <span className="float-right">20% Complete</span>
                </div>
              </div>
            </div>
            <div className="flex-1 shadow-2xl">
              <div>
                <img
                  src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/wordpress-400x223.jpg"
                  alt="course2"
                  className="w-full"
                ></img>
              </div>
              <div className="flex flex-col p-5 gap-5 bg-white border">
                <div>
                  <h1 className="lg:text-4xl w-full h-[80px]">
                    WordPress Basic Tutorial
                  </h1>
                </div>
                <div>
                  <button className="bg-blue rounded w-full p-1 text-white">
                    See more...
                  </button>
                </div>
                <div>
                  <div class="h-4 bg-gray-300 rounded-full w-full">
                    <div
                      className="h-full bg-orange rounded-full"
                      style={{ width: "50%" }} // Use an object here
                    ></div>
                  </div>
                  <span className="float-right">50% Complete</span>
                </div>
              </div>
            </div>
            <div className="flex-1 shadow-2xl">
              <div>
                <img
                  src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/ecommerce-400x223.jpg"
                  alt="course3"
                  className="w-full"
                ></img>
              </div>
              <div className="flex flex-col p-5 gap-5 bg-white border">
                <div>
                  <h1 className="lg:text-4xl w-full h-[80px]">
                    E-Commerce Course
                  </h1>
                </div>
                <div>
                  <button className="bg-blue rounded w-full p-1 text-white">
                    See more...
                  </button>
                </div>
                <div>
                  <div class="h-4 bg-gray-300 rounded-full w-full">
                    <div
                      className="h-full bg-orange rounded-full"
                      style={{ width: "70%" }} // Use an object here
                    ></div>
                  </div>
                  <span className="float-right">70% Complete</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="therd-section p-[30px] text-white">
          <div className="relative z-10 my-10">
            <div className="flex gap-5">
              <div className="flex-1">
                <div className="border-4 w-1/4 border-dashed border-orange transform skew-x-12"></div>
                <h1 className="text-2xl font-bold my-3">Experience</h1>
                <p>
                  Lorem ipsum dolor sit amet, consec tetur adipis cing elit. Ut
                  elit tellus, luctus nec ullam corper mattis, pulvinar dapibus.
                </p>
              </div>
              <div className="flex-1">
              <div className="border-4 w-1/4 border-dashed border-orange transform skew-x-12"></div>
                <h1 className="text-2xl font-bold my-3">Education</h1>
                <p>
                  Lorem ipsum dolor sit amet, consec tetur adipis cing elit. Ut
                  elit tellus, luctus nec ullam corper mattis, pulvinar dapibus.
                </p>
              </div>
              <div className="flex-1">
              <div className="border-4 w-1/4 border-dashed border-orange transform skew-x-12"></div>
                <h1 className="text-2xl font-bold my-3">Certificate</h1>
                <p>
                  Lorem ipsum dolor sit amet, consec tetur adipis cing elit. Ut
                  elit tellus, luctus nec ullam corper mattis, pulvinar dapibus.
                </p>
              </div>
              <div className="bg-white text-black p-5 w-96">
                <h3>Study at Your Own Pace</h3>
                <h1 className="lg:text-2xl font-bold my-4">Boost Your Career by Learning Skills in High Demand</h1>
                <a href="/">GET STARTED</a>
              </div>
            </div>
          </div>
        </section>
        <section className="h-screen">
          <div>hello</div>
        </section>
      </div>
    </>
  );
}
