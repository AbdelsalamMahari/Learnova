import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../../layout/navbar/Navbar";
import Button from "../../components/buttons/button";
import Icons from "../../assets/icons/icons";
import Footer from "../../layout/footer/Footer";
import Logo from "../../assets/images/LearnovaLogo2.png"

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <section className="backdrop-image">
        <Navbar imgSrc={Logo} className={"text-white"}/>
        <div className="backdrop-section">
          <div className="lg:w-1/2 md:w-full">
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
        <div className="flex p-[40px] popular-top">
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
        <div className="flex p-[40px] gap-6 cont-course">
          {/* 1 */}
          <div className="flex-1 shadow-2xl bg-white rounded-3xl">
            <div>
              <img
                src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/html-400x223.jpg"
                alt="course1"
                className="w-full rounded-3xl"
              ></img>
            </div>
            <div className="flex flex-col p-5 gap-5">
              <div>
                <h1 className="lg:text-4xl w-full ">HTML5/CSS3 Essentials</h1>
              </div>
              <div>
                <button
                  onClick={() => navigate(`/courseInfo`)}
                  className="bg-blue rounded w-full p-1 text-white"
                >
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
          <div className="flex-1 shadow-2xl bg-white rounded-3xl">
            <div>
              <img
                src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/wordpress-400x223.jpg"
                alt="course2"
                className="w-full rounded-3xl"
              ></img>
            </div>
            <div className="flex flex-col p-5 gap-5">
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
          <div className="flex-1 shadow-2xl bg-white rounded-3xl">
            <div>
              <img
                src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/ecommerce-400x223.jpg"
                alt="course3"
                className="w-full rounded-3xl"
              ></img>
            </div>
            <div className="flex flex-col p-5 gap-5">
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
      <section className="therd-section p-[40px] text-white">
        <div className="relative z-10 my-10">
          <div className="flex gap-5 exp-blue-sec">
            <div className="flex-1">
              <div
                className="tilted-box"
                style={{ "--skew-angle": "40deg" }}
              ></div>
              <h1 className="text-2xl font-bold my-3">Experience</h1>
              <p>
                Lorem ipsum dolor sit amet, consec tetur adipis cing elit. Ut
                elit tellus, luctus nec ullam corper mattis, pulvinar dapibus.
              </p>
            </div>
            <div className="flex-1">
              <div
                className="tilted-box"
                style={{ "--skew-angle": "40deg" }}
              ></div>
              <h1 className="text-2xl font-bold my-3">Education</h1>
              <p>
                Lorem ipsum dolor sit amet, consec tetur adipis cing elit. Ut
                elit tellus, luctus nec ullam corper mattis, pulvinar dapibus.
              </p>
            </div>
            <div className="flex-1">
              <div
                className="tilted-box"
                style={{ "--skew-angle": "40deg" }}
              ></div>
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
      <section className="p-[40px] flex items-center overflow-x-auto">
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
      <section className="p-[40px]">
        <div className="flex Testimonials">
          <div className="flex-1">
            <h4>Testimonials</h4>
            <h1 className="lg:text-4xl font-bold my-5">
              Trusted by Thousand of Students and Tutors
            </h1>
          </div>
          <div className="flex-1 text-4xl font-bold flex items-center justify-center text-center">
            <h1 className="text-orange">4.8<br></br>Ratings</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 my-[60px]">
          {/* First Grid Item */}
          <div className="bg-white px-10 rounded-xl profile-home-div my-[40px]">
            <div className="profile-home-img shadow-2xl">
              <img
                src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/10/online-programming-course-review-02.jpg"
                alt="Profile 1"
              />
            </div>
            <div className="mt-4">
              <p>
                “Massa amet, at dolor tellus pellentesque aenean in eget massa
                tincidunt habitasse volutpat adipiscing sed id sit auctor eu
                vivamus nulla.”
              </p>
            </div>
            <div className="my-4 font-bold">
              <p>Emma Hart</p>
            </div>
          </div>

          {/* Second Grid Item */}
          <div className="bg-white px-10 rounded-xl profile-home-div my-[40px]">
            <div className="profile-home-img shadow-2xl">
              <img
                src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/10/online-programming-course-review-01.jpg"
                alt="Profile 1"
              />
            </div>
            <div className="mt-4">
              <p>
                “Massa amet, at dolor tellus pellentesque aenean in eget massa
                tincidunt habitasse volutpat adipiscing sed id sit auctor eu
                vivamus nulla.”
              </p>
            </div>
            <div className="my-4 font-bold">
              <p>Emma Hart</p>
            </div>
          </div>

          {/* Third Grid Item */}
          <div className="bg-white px-10 rounded-xl profile-home-div my-[40px]">
            <div className="profile-home-img shadow-2xl">
              <img
                src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/10/online-programming-course-review-03.jpg"
                alt="Profile 1"
              />
            </div>
            <div className="mt-4">
              <p>
                “Massa amet, at dolor tellus pellentesque aenean in eget massa
                tincidunt habitasse volutpat adipiscing sed id sit auctor eu
                vivamus nulla.”
              </p>
            </div>
            <div className="my-4 font-bold">
              <p>Emma Hart</p>
            </div>
          </div>

          {/* Fourth Grid Item */}
          <div className="bg-white px-10 rounded-xl profile-home-div my-[40px]">
            <div className="profile-home-img shadow-2xl">
              <img
                src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/10/online-programming-course-review-04.jpg"
                alt="Profile 1"
              />
            </div>
            <div className="mt-4">
              <p>
                “Massa amet, at dolor tellus pellentesque aenean in eget massa
                tincidunt habitasse volutpat adipiscing sed id sit auctor eu
                vivamus nulla.”
              </p>
            </div>
            <div className="my-4 font-bold">
              <p>Emma Hart</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
