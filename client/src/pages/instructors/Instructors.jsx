import React from "react";
import "./Instructors.css";
import TopPage from "../../components/topPage/TopPage";
import Footer from "../../layout/footer/Footer";


export default function Instructors() {
  return (
    <>
      <TopPage
        title="Instructors"
        backgroundImageUrl="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/02/bg-04-free-img.jpg"
      />
      <section className="section1-instructor">
        <div className="container-instructor">
          <div className="first-instructor">
            <h4>Teachers With Vision</h4>
            <h1>Our Instructors</h1>
          </div>
          <div className="second-instructor">
            <div className="second-instructor-pro">
              <p>
                Explore a comprehensive online course management system designed to empower both educators and learners.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section2-instructor">
        <div className="container2-instructor">
          <div className="first2-instructor">
            <img src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2021/03/instructor-02-free-img.jpg" alt="instuctor" />
          </div>
          <div className="second2-instructor">
            <h4>HTML5/CSS3 Instructor</h4>
            <h1>Deborah Holmes</h1>
            <p>
              Explore a comprehensive online course management system designed to empower both educators and learners.
            </p>
          </div>
        </div>
        <div className="container2-instructor">
          <div className="first2-instructor">
            <img src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/02/instructor-04-free-img.jpg" alt="instuctor" />
          </div>
          <div className="second2-instructor">
            <h4>Marketing Instructor</h4>
            <h1>Bruce Stevens</h1>
            <p>
              Explore a comprehensive online course management system designed to empower both educators and learners.
            </p>
          </div>
        </div>
        <div className="container2-instructor">
          <div className="first2-instructor">
            <img src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/02/instructor-03-free-img.jpg" alt="instuctor" />
          </div>
          <div className="second2-instructor">
            <h4>WordPress Instructor</h4>
            <h1>Michelle Baker</h1>
            <p>
              Explore a comprehensive online course management system designed to empower both educators and learners.
            </p>
          </div>
        </div>
        <div className="container2-instructor">
          <div className="first2-instructor">
            <img src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/02/instructor-05-free-img.jpg" alt="instuctor" />
          </div>
          <div className="second2-instructor">
            <h4>JavaScript Instructor</h4>
            <h1>Paul Santos</h1>
            <p>
              Explore a comprehensive online course management system designed to empower both educators and learners.
            </p>
          </div>
        </div>
        <div className="container2-instructor">
          <div className="first2-instructor">
            <img src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/03/instructor-01-free-img.jpg" alt="instuctor" />
          </div>
          <div className="second2-instructor">
            <h4>Marketing Instructor</h4>
            <h1>Donna Carroll</h1>
            <p>
              Explore a comprehensive online course management system designed to empower both educators and learners.
            </p>
          </div>
        </div>
        <div className="container2-instructor">
          <div className="first2-instructor">
            <img src="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/03/instructor-06-free-img.jpg" alt="instuctor" />
          </div>
          <div className="second2-instructor">
            <h4>PHP Instructor</h4>
            <h1>Scott Valdez</h1>
            <p>
              Explore a comprehensive online course management system designed to empower both educators and learners.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
