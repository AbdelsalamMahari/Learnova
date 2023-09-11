import React from "react";
import "./Home.css";
import Navbar from "../../layout/navbar/Navbar";
import Button from "../../components/buttons/button";
import Icons from "../../assets/icons/icons";
import Footer from "../../layout/footer/Footer";

export default function Home() {
  return (
    <>
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
      <section className="">
        <div className="flex p-[30px] popular-top">
          <div className="flex-1">
            <h4>Top Categories</h4>
            <h1 className="lg:text-5xl">Popular Courses</h1>
          </div>
          <div className="flex-1 border-l-2 border-orange pl-8">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim.
            </p>
          </div>
          <div className="flex-1">
            <Button text="VIEW ALL COURSES" className="float-right"></Button>
          </div>
        </div>
        <div className="flex p-[30px] gap-6 cont-course">
          {/* 1 */}
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
                <h1 className="lg:text-4xl w-full ">HTML5/CSS3 Essentials</h1>
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
          {/* 2 */}
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
                <h1 className="lg:text-4xl w-full ">
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
          {/* 3 */}
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
                <h1 className="lg:text-4xl w-full ">E-Commerce Course</h1>
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
          <div className="flex gap-5 exp-blue-sec">
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
              <h1 className="lg:text-2xl font-bold my-4">
                Boost Your Career by Learning Skills in High Demand
              </h1>
              <a href="/">GET STARTED</a>
            </div>
          </div>
        </div>
      </section>
      <section className="p-[30px] flex items-center overflow-x-auto">
        <div className="flex choose-us">
          <div className="flex-1">
            <div>
              <h4>Features of Our Courses</h4>
              <h1 className="lg:text-4xl font-bold my-5">Why Choose Us?</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex gap-5">
              <div>
                <Icons.Crown size={30} className="text-orange" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Best Industry Leaders</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div>
                <Icons.Clock size={30} className="text-orange" />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  Learn Online at Your Own Pace
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div>
                <Icons.Certificate size={30} className="text-orange" />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  Professional Certification
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-[30px]">
        <div className="w-1/2">
          <h4>Testimonials</h4>
          <h1 className="lg:text-4xl font-bold my-5">Trusted by Thousand of Students and Tutors</h1>
        </div>
      </section>
      <Footer />
    </>
  );
}
