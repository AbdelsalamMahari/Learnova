import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Home.css";
import Navbar from "../../layout/navbar/Navbar";
import Button from "../../components/buttons/button";
import Icons from "../../assets/icons/icons";
import Footer from "../../layout/footer/Footer";
import Logo from "../../assets/images/LearnovaLogo2.png";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function Home() {
  const navigate = useNavigate();

  const [text] = useTypewriter({
    words: [
      "Learning Fuels Creative Thinking",
      "Learn to Create",
      "Explore, Imagine, Innovate!",
    ],
    loop: {},
    typeSpeed: 60,
    deleteSpeed: 100,
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the first 3 courses from the API using Axios
    Axios.get("http://localhost:5000/courses")
      .then((response) => {
        // Get the first 3 courses
        const first3Courses = response.data.slice(0, 3);
        setCourses(first3Courses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch feedback data from the provided URL
    fetch("http://localhost:5000/feedbacks/home")
      .then((response) => response.json())
      .then((data) => setFeedbackData(data))
      .catch((error) => console.error("Error fetching feedback data:", error));
  }, []);

  return (
    <>
      <section className="backdrop-image">
        <Navbar imgSrc={Logo} className={"text-white"} />
        <div className="backdrop-section">
          <div className="lg:w-1/2 md:w-full">
            <h1 className="lg:text-6xl font-bold text-white my-8 ">
              <span>{text}</span> <Cursor cursorColor="#FFA500" />
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
            <Button
              text="VIEW ALL COURSES"
              className="float-right"
              onClick={() => navigate(`/allCourses`)}
            ></Button>
          </div>
        </div>
        <div className="flex p-[40px] gap-6 cont-course">
          {/* Map through the first 3 courses */}
          {courses.map((course) => (
            <div
              key={course._id}
              className="flex-1 shadow-2xl bg-white rounded-3xl"
            >
              <div>
                {course.backdrop ? (
                  <img
                    src={`http://localhost:5000/courses/getBackdrop/${course._id}`}
                    alt="Upload"
                    className="w-full rounded-3xl h-[250px] object-cover"
                  />
                ) : (
                  <img
                    src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
                    alt="Default Profile"
                    className="w-full rounded-3xl"
                  />
                )}
              </div>
              <div className="flex flex-col p-5 gap-5">
                <div>
                  <h1 className="lg:text-4xl w-full overflow-hidden overflow-ellipsis ">
                    {course.name}
                  </h1>
                </div>
                <div>
                  <button
                    onClick={() => navigate(`/courseInfo/${course._id}`)}
                    className="bg-blue rounded w-full p-1 text-white"
                  >
                    See more...
                  </button>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded-full w-full">
                    <div
                      className="h-full bg-orange rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="float-right">
                    {course.progress}% Complete
                  </span>
                </div>
              </div>
            </div>
          ))}
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 my-[60px]">
          {feedbackData.map((feedback, index) => (
            <div
              key={index}
              className="bg-white px-10 rounded-xl profile-home-div my-[30px]"
            >
              <div className="profile-home-img shadow-2xl">
                {feedback.profile.includes("googleusercontent.com") ? (
                  <img src={feedback.profile} alt={`Profile ${index + 1}`} />
                ) : feedback.profile ? (
                  <img
                    src={`http://localhost:5000/users/userProfile/${feedback.userId}`}
                    alt={`Profile ${index + 1}`}
                  />
                ) : (
                  <img
                    src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
                    alt={`Default Profile ${index + 1}`}
                  />
                )}
              </div>
              <div className="mt-4">
                <p>{`"${feedback.text}"`}</p>
              </div>
              <div className="my-4 font-bold">
                <p>{`${feedback.firstName} ${feedback.lastName}`}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
