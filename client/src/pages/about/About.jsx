import React from "react";
import "./About.css";
import TopPage from "../../components/topPage/TopPage";
import Icons from "../../assets/icons/icons";

export default function About() {

  return (
    <>
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
              </div>
              <div className="second-div-about">
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
            <form onSubmit="">
              <textarea
                placeholder="Your feedback..."
                value=""
                onChange=""
              />
            </form>
          </div>
          <div className="feedback-submit">
            <button type="submit">Submit</button>
          </div>
        </div>
      </section>
    </>
  );
}
