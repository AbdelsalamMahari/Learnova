import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import Navbar from "../../layout/navbar/Navbar"
import Logo from "../../assets/images/LearnovaColoredLogo2.png";
import Footer from "../../layout/footer/Footer";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    cv: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleCv = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      setSelectedFile(file);
      setSelectedFileName(fileName);
    }
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const url = "http://localhost:5000/signup";
      
      // Create a new FormData object to handle file upload for cv
      const formDataCv = new FormData();
      
      if (selectedFile) {
        formDataCv.append("cv", selectedFile);
      }
    
      // Use Promise.all to send multiple requests concurrently
      const [cvResponse, signupResponse] = await Promise.all([
        selectedFile
          ? axios.post("http://localhost:5000/users/cvNoId", formDataCv, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
          : Promise.resolve(null), // Skip the CV upload if no file selected
        axios.post(url, {
          ...data,
          cv: selectedFileName || null, // Use null if selectedFileName is empty
        }),
      ]);
    
      toast.success(signupResponse.data.message, {
        theme: "colored",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message, {
          theme: "colored",
        });
      }
    }
  };
  

  // Define options for the role select input
  const roleOptions = ["student", "instructor"];

  return (
    <>
      <ToastContainer />
      <Navbar imgSrc={Logo} className={"bg-white relative"} />
      <div className="background-signup-stu">
        <div className="signup-stu-form">
          <div className="my-10 flex items-center justify-center ">
            <div className="bg-white py-8 px-[50px] rounded shadow-2xl">
              <div>
                <h2 className="text-xl font-semibold">Register</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="student-username">First Name:</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      className="rounded w-full input-field bg-gray-100 px-4 py-4 border"
                      value={data.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="student-password">Last Name:</label>
                    <input
                      type="text"
                      placeholder="LastName"
                      name="lastName"
                      className="rounded w-full input-field bg-gray-100 px-4 py-4 border"
                      value={data.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="student-password">Email:</label>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="rounded w-full input-field bg-gray-100 px-4 py-4 border"
                      value={data.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="student-password">Password:</label>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="rounded w-full input-field bg-gray-100 px-4 py-4 border"
                      value={data.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="student-role">I Want To Be:</label>
                    <select
                      name="role"
                      className="rounded w-full input-field bg-gray-100 px-4 py-4 border"
                      value={data.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Choose one</option>
                      {roleOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Conditionally render cv and phone number fields for Instructor */}
                  {data.role === "instructor" && (
                    <>
                      <div className="mb-4">
                        <label htmlFor="student-phoneNumber">Phone Number:</label>
                        <input
                          type="text"
                          placeholder="Phone Number"
                          name="phoneNumber"
                          className="rounded w-full input-field bg-gray-100 px-4 py-4 border"
                          value={data.phoneNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="student-phoneNumber">Your CV:</label>
                        <input
                          type="file"
                          placeholder="Phone Number"
                          accept=".pdf"
                          className="rounded w-full input-field bg-gray-100 px-4 py-4 border"
                          onChange={handleCv}
                          required
                        />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="bg-orange text-white py-2 px-4 hover:bg-blue-600 rounded-full w-full mt-4"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Signup;
