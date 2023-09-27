import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllCourses.css";
import TopPage from "../../components/topPage/TopPage";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/loading";
import Footer from "../../layout/footer/Footer";
import Icons from "../../assets/icons/icons";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/courses")
      .then(async (response) => {
        const coursesData = response.data;

        // Fetch instructor data for each course
        const coursesWithInstructors = await Promise.all(
          coursesData.map(async (course) => {
            const instructorResponse = await axios.get(
              `http://localhost:5000/users/find/${course.instructor}`
            );
            const instructorData = instructorResponse.data;
            return { ...course, instructorData };
          })
        );

        setCourses(coursesWithInstructors);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
        setIsLoading(false);
      });
  }, []);

  // Filter courses with deployable: true
  const deployableCourses = courses.filter(
    (course) => course.deployable === true
  );

  // Filter courses by search query
  const filteredCourses = deployableCourses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <TopPage
        title="All Courses"
        backgroundImageUrl="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/02/bg-08-free-img.jpg"
      />
      <div className="flex justify-center items-center mt-10">
        <div className="search">
          <label>
            <input
              type="text"
              placeholder="Search by course name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>
        <div>
          <Icons.Search size={30} />
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="section2-instructor">
          {filteredCourses.map((course, index) => (
            <div className="container2-instructor" key={index}>
              <div className="first2-instructor">
                {course.backdrop ? (
                  <img
                    src={`http://localhost:5000/courses/getBackdrop/${course._id}`}
                    alt="Upload"
                  />
                ) : (
                  <img
                    src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
                    alt="Default Profile"
                  />
                )}
              </div>
              <div className="second2-instructor">
                <h1>{course.name}</h1>
                <p>
                  by: {course.instructorData.firstName}{" "}
                  {course.instructorData.lastName}
                </p>
                <Link to={`/courseInfo/${course._id}`}>
                  <button className="bg-blue rounded w-full p-1 text-white mb-5">
                    See more...
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </>
  );
}
