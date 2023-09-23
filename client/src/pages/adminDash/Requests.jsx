import React, { useEffect, useState } from "react";
import axios from "axios";
import "./assets/css/style.css";
import Sidebar from "../../components/sidebars/AdminSideBar";
import Icons from "../../assets/icons/icons";
import Cookies from "js-cookie";
import CVModal from "../../components/modals/cvModal"; // Import your modal component

export default function Requests() {
  const [instructors, setInstructors] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCVUrl, setSelectedCVUrl] = useState("");

  const handleCVClick = (cvUrl) => {
    setSelectedCVUrl(cvUrl);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const response = await axios.get(
        "http://localhost:5000/users/role/instructor",
        {
          headers: {
            token: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const handleAccept = async (userId) => {
    try {
      await axios.put(
        `http://localhost:5000/users/${userId}`,
        {
          isInstructor: true,
        },
        {
          headers: {
            token: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      // Update the instructors state with the updated data
      fetchRequests();
    } catch (error) {
      console.error("Error accepting instructor request:", error);
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.put(
        `http://localhost:5000/users/${userId}`,
        {
          role: "student",
        },
        {
          headers: {
            token: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      // Update the instructors state with the updated data
      fetchRequests();
    } catch (error) {
      console.error("Error accepting instructor request:", error);
    }
  };

  return (
    <>
      <div className="container-admin">
        <Sidebar />
        <div className="main-admin">
          <div className="topbar">
            <div className="toggle">
              <Icons.Bars size={24} />
            </div>
            <div className="search">
              <label>
                <input type="text" placeholder="Search here" />
                <ion-icon name="search-outline"></ion-icon>
              </label>
            </div>
          </div>
          <div className="dash-container">
            <div className="cardHeader">
              <h2 className="mb-10">
                Requests from Users Interested in Becoming Instructors
              </h2>
            </div>

            {instructors.length === 0 ? (
              <p>No requests</p>
            ) : (
              <div className="table-container">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Cv</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instructors.map((instructor, index) => (
                      <tr key={index}>
                        <td>{instructor.firstName}</td>
                        <td>{instructor.lastName}</td>
                        <td>{instructor.email}</td>
                        <td>{instructor.phoneNumber}</td>
                        <td
              className="cursor-pointer text-blue-500"
              onClick={() => handleCVClick(`http://localhost:5000/users/userCv/${instructor._id}`)}
            >
              View CV
            </td>
                        <td className="flex justify-center items-center gap-2">
                          <button className="bg-green-500 p-2 rounded-md text-white" onClick={() => handleAccept(instructor._id)}>
                            <Icons.Check/>
                          </button>
                          <button className="bg-red-500 p-2 rounded-md text-white" onClick={() => handleReject(instructor._id)}>
                          <Icons.Close/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <CVModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        cvUrl={selectedCVUrl}
      />
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
