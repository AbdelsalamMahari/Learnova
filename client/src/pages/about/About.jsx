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
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam minima autem libero reiciendis fuga mollitia alias molestias iure, fugiat consectetur dolorem repellendus tempora, ipsam magni deserunt.</p>
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
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam minima autem libero reiciendis fuga mollitia alias molestias iure, fugiat consectetur dolorem repellendus tempora, ipsam magni deserunt.</p>
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
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam minima autem libero reiciendis fuga mollitia alias molestias iure, fugiat consectetur dolorem repellendus tempora.</p>
            <div className="second2-about-pro">
              <div className="first-div-about">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam minima autem libero reiciendis fuga mollitia alias molestias iure, fugiat consectetur dolorem repellendus tempora.</p>
              </div>
              <div className="second-div-about">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam minima autem libero reiciendis fuga mollitia alias molestias iure, fugiat consectetur dolorem repellendus tempora.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section4 p-[30px] text-white">
        <div className="relative z-10 my-10">
          <div className="flex gap-5">
            <div className="flex-1">
              <Icons.Crown className="icons-about"/>
              <h1 className="text-2xl font-bold my-3">Learn From Industry Leaders</h1>
              <p>
                Lorem ipsum dolor sit amet, consec tetur adipis cing elit. Ut
                elit tellus, luctus nec ullam corper mattis, pulvinar dapibus.
              </p>
            </div>
            <div className="flex-1">
              <Icons.Clock className="icons-about"/>
              <h1 className="text-2xl font-bold my-3">Learn at Your Own Pace</h1>
              <p>
                Lorem ipsum dolor sit amet, consec tetur adipis cing elit. Ut
                elit tellus, luctus nec ullam corper mattis, pulvinar dapibus.
              </p>
            </div>
            <div className="flex-1">
              <Icons.Certificate className="icons-about"/>
              <h1 className="text-2xl font-bold my-3">Professional Certification</h1>
              <p>
                Lorem ipsum dolor sit amet, consec tetur adipis cing elit. Ut
                elit tellus, luctus nec ullam corper mattis, pulvinar dapibus.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="feedback-container">
          <div className="feedback-form">
            <h2>
              <b>Give Us Your Feedback</b>
            </h2>
            <form onSubmit="">
              <textarea
                placeholder="Your feedback..."
                value=""
                onChange=""
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </section>
    </>
  );
}
