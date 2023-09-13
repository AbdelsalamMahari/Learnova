import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopPage from "../../components/topPage/TopPage";
import Cookies from "js-cookie"; // Import the js-cookie library
import axios from "axios";
import Footer from "../../layout/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export default function Login() {
  const [isStudent, setIsStudent] = useState(true);
  const [data, setData] = useState({ email: "", password: "" });

  const handleStudentClick = () => {
    setIsStudent(true);
  };

  const handleInstructorClick = () => {
    setIsStudent(false);
  };

  const handleChangeStudent = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/login/student";
      const { data: res } = await axios.post(url, data);
      // Store the token in a cookie with js-cookie
      Cookies.set("token", res.data, { expires: 7 }); // Expires in 7 days
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.warn(error.response.data.message, {
          theme: "colored",
        });
      }
    }
  };

  const googleAuth = () => {
    window.open(`http://localhost:5000/auth/google/callback`, "_self");
  };

  return (
    <>
      <ToastContainer />
      <TopPage
        title={"Login"}
        backgroundImageUrl="https://brendacadman.com/wp-content/uploads/Blog-FeatureImage-06.jpg"
      />
      <div className="my-10 flex items-center justify-center ">
        <div className="bg-white p-8 rounded shadow-lg">
          <div className="mb-4">
            <button
              className={`mr-4 py-2 px-4 rounded ${
                isStudent
                  ? "bg-blue-500 text-white"
                  : "bg-blue text-white rounded-full"
              }`}
              onClick={handleStudentClick}
            >
              Login as Student
            </button>
            <button
              className={`py-2 px-4 rounded ${
                !isStudent
                  ? "bg-blue-500 text-white"
                  : "bg-blue text-white rounded-full"
              }`}
              onClick={handleInstructorClick}
            >
              Login as Instructor
            </button>
          </div>
          {isStudent ? (
            <div>
              <h2 className="text-xl font-semibold">Student Login</h2>
              <form onSubmit={handleSubmitStudent} className="mt-4">
                <div className="mb-4">
                  <label htmlFor="student-username">Email:</label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="rounded w-full input-field bg-gray-100 px-4 py-4 border"
                    onChange={handleChangeStudent}
                    value={data.email}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="student-password">Password:</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="rounded w-full input-field bg-gray-100 px-4 py-4 border"
                    onChange={handleChangeStudent}
                    value={data.password}
                  />
                  <Link to="/forgot-password">
                    <p className="underline mt-1">Lost your password?</p>
                  </Link>
                </div>
                <button
                  type="submit"
                  className="bg-orange text-white py-2 px-4 hover:bg-blue-600 rounded-full w-full"
                >
                  Login
                </button>
              </form>
              <div className="mt-2">
                <h1>
                  New Here?
                  <Link to="/signupStudent">
                    <span className="underline text-orange"> Sign Up</span>
                  </Link>
                </h1>
              </div>
              <hr className="my-4"></hr>
              <div>
                <button
                  className="login-with-google-btn w-full"
                  onClick={googleAuth}
                >
                  Google
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold">Instructor Login</h2>
              <form className="mt-4">
                <div className="mb-4">
                  <label htmlFor="instructor-username">Username:</label>
                  <input
                    type="text"
                    id="instructor-username"
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="instructor-password">Password:</label>
                  <input
                    type="password"
                    id="instructor-password"
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-orange text-white rounded py-2 px-4 hover:bg-blue-600"
                >
                  Login
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
