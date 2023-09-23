import React, { useEffect, useState } from "react";
import "./Instructors.css";
import TopPage from "../../components/topPage/TopPage";
import Footer from "../../layout/footer/Footer";
import Axios from "axios";
import UserInfo from "../../components/users/UserInfo";

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const user = UserInfo(); // Assuming UserInfo fetches user instructor information

  useEffect(() => {
    Axios.get("http://localhost:5000/users/allInstructor")
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  }, []);

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
                Explore a comprehensive online course management system designed
                to empower both educators and learners.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section2-instructor">
        {instructors.map((instructor, index) => (
          <div className="container2-instructor" key={index}>
            <div className="first2-instructor">
            {instructor.profilePic ? (
                // Check if the profilePic URL contains "googleusercontent.com"
                instructor.profilePic.includes("googleusercontent.com") ? (
                  <img
                    src={instructor.profilePic} // Use the Google-hosted URL directly
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src={`http://localhost:5000/users/userProfile/${instructor._id}`} // Use the local URL
                    alt="Upload"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                )
              ) : (
                <img
                  src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
                  alt="Default Profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
              )}
            </div>
            <div className="second2-instructor">
              <h1>
                {instructor.firstName} {instructor.lastName}
              </h1>
              <h3>{instructor.email}</h3>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}
