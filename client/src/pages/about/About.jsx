import React from "react";
import "./About.css";
import TopPage from "../../components/topPage/TopPage";

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
            <hr />
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam minima autem libero reiciendis fuga mollitia alias molestias iure, fugiat consectetur dolorem repellendus tempora, ipsam magni deserunt.</p>
          </div>
        </div>
      </section>
    </>
  );
}
