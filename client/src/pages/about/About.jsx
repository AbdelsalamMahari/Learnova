import React, { useState, useEffect } from "react";
import axios from "axios";
import "./About.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopPage from "../../components/topPage/TopPage";
import Icons from "../../assets/icons/icons";
import Footer from "../../layout/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";



export default function About() {
  const imgURL="/usersProfiles/"
  const [testimonialItems, setTestimonialItems] = useState([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const response = await axios.get("http://localhost:5000/feedbacks");
        const feedbacksWithUserInfo = await Promise.all(
          response.data.map(async (feedback) => {
            if (feedback.isAddedToSlider) {
              const userResponse = await axios.get(
                `http://localhost:5000/users/find/${feedback.userId}`
              );
              const user = userResponse.data;
              return { user, feedbackText: feedback.text };
            }
            return null;
          })
        );
        setTestimonialItems(feedbacksWithUserInfo.filter(Boolean)); // Filter out null values
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    }

    fetchFeedbacks();
  }, []);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [feedback, setFeedback] = useState("");
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/feedbacks/save",
        {
          userId: user._id,
          text: feedback,
        }
      );

      if (response.status === 200) {
        console.log("Feedback submitted:", feedback);
        setFeedback(""); // Clear feedback state
        toast.success("Feedback successfully submitted. Thank you!", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.warn("Please Login First", {
        theme: "colored",
      });
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);
    }

    getUserInfo();
  }, []);

  return (
    <>
    <ToastContainer/>
      <TopPage
        title="About Us"
        backgroundImageUrl="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2021/03/bg-07-free-img.jpg"
      />
      <section className="section2-about">
        <div className="container-about">
          <div className="first-about">
            <h1>What We're All About</h1>
          </div>
          <div className="second-about">
            <div className="second-about-pro">
              <p>
                Explore a comprehensive online course management system designed to empower both educators and learners. Our platform offers a seamless educational experience with advanced features that simplify the learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section3-about">
        <div className="container2-about">
          <div className="first2-about">
            <img src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/02/about-01-free-img.jpg" alt="hello" />
          </div>
          <div className="second2-about">
            <h1>Learn Something Every Day</h1>
            <div className="tilted-box" style={{ '--skew-angle': '40deg' }}></div>
            <p>
              Discover our user-friendly online course management system, carefully crafted to provide you with the tools you need to excel in your studies. Whether you're a student or an instructor, our platform is here to support your educational goals.
            </p>
          </div>
        </div>
      </section>
      <section className="testimonial-section">
        <h1 className="font-bold">What They're Talking About us?</h1>
        <div className="testimonial-container">
          <div className="slider-feedback">
            <Slider {...settings} >
              {testimonialItems.map((item, index) => (
                <div key={index} className="feedback-item">
                  {item.user && (
                    <div className="author">
                      <div className="image">
                        <img
                          decoding="async"
                          src={
                            imgURL + item.user.profilePic
                              ? `${imgURL + item.user.profilePic}`
                              : "https://img.freepik.com/free-icon/man_318-677829.jpg"
                          }
                          alt={`${item.user.firstName}`}
                        />
                      </div>
                      <div className="info">
                        <h3 className="name">{`${item.user.firstName} ${item.user.lastName}`}</h3>
                        <p className="job">{item.user.email}</p>
                      </div>
                    </div>
                  )}
                  <p className="content">{item.feedbackText}</p>
                </div>
              ))}
            </Slider>
          </div>
          <div className="moviesNowPlaying-about">
            <img src="	https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-testimonial-home-2.png" alt="" width={400} />
          </div>
        </div>
      </section>

      <section className="section4-about">
        <div className="container3-about">
          <div className="first3-about">
            <h3>Our Vision</h3>
            <h1>Who We Are</h1>
          </div>
          <div className="second3-about">
            <h2>"It is impossible for a man to learn what he thinks he already knows."</h2>
            <p>
              At the core of our online course management system is a commitment to continuous improvement. We believe that learning is a lifelong endeavor, and our platform is dedicated to helping you acquire knowledge at your own pace.
            </p>
            <div className="second2-about-pro">
              <div className="first-div-about">
                <p>
                  Our vision for the online course management system is simple: to foster a dynamic learning environment where individuals can expand their horizons and challenge their preconceptions. Join us on this educational journey.
                </p>
                <p>
                  Our system ensures a seamless learning journey, equipped with advanced features that simplify the educational process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section4 p-[30px] text-white">
        <div className="relative z-10 my-10">
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex-1">
              <Icons.Crown className="icons-about" />
              <h1 className="text-2xl font-bold my-3">Learn From Industry Leaders</h1>
              <p>
                Our platform allows you to learn from industry leaders, giving you the opportunity to benefit from their expertise and knowledge in various fields. Start your educational journey with us today.
              </p>
            </div>
            <div className="flex-1">
              <Icons.Clock className="icons-about" />
              <h1 className="text-2xl font-bold my-3">Learn at Your Own Pace</h1>
              <p>
                We provide you with the opportunity to learn at your own pace. Choose when and how you study, and we'll be here to support you in achieving your educational goals in the best way possible.
              </p>
            </div>
            <div className="flex-1">
              <Icons.Certificate className="icons-about" />
              <h1 className="text-2xl font-bold my-3">Professional Certification</h1>
              <p>
                Earn a professional certification that enhances your career prospects. Through our online course management system, you'll have the chance to obtain recognized certificates that boost your job opportunities and success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="feedback-container">
        <div className="feedback-form">
          <div className="feedback-form-about">
            <h2>
              <b>Give Us Your Feedback</b>
            </h2>
            <p>"we value your input to make our website even better."</p>
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="Your feedback..."
                value={feedback}
                onChange={handleFeedbackChange}
              />
              <div className="feedback-submit">
              <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
