import React, { useEffect, useState } from "react";
import Axios from "axios";
import UserInfo from "../../components/users/UserInfo";
import SideBar from "../../components/sidebars/AdminSideBar";
import Icons from "../../assets/icons/icons";
import "./assets/css/style.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MakeAdmin = () => {
  const [instructors, setInstructors] = useState([]);
  const user = UserInfo();

  const fetchInstructors = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/users", {
        headers: {
          token: `Bearer ${Cookies.get("token")} `,
        },
      });
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  useEffect(() => {
    fetchInstructors(); // Initial fetch
  }, []);

  const handleDelete = async (userId) => {
    try {
      // Send the delete request
      await Axios.delete(`http://localhost:5000/users/${userId}`, {
        headers: {
          token: `Bearer ${Cookies.get("token")} `,
        },
      });

      // Show toast on successful deletion
      toast.success("User deleted successfully", {
        theme: "colored",
      });

      // Fetch updated instructors list after successful deletion
      fetchInstructors();
    } catch (error) {
      console.error("Error deleting instructor:", error);
      // Show an error toast if the deletion fails
      toast.error("Error deleting user", {
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="container-admin">
        <SideBar />
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
            <div className="table-container">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((instructor, index) => (
                    <tr key={index}>
                      <td>{instructor.firstName}</td>
                      <td>{instructor.lastName}</td>
                      <td>{instructor.email}</td>
                      <td>{instructor.role}</td>
                      <td className="flex justify-center items-center gap-2">
                      <button
                          className="bg-green-500 p-2 rounded-md text-white"
                          onClick={() => handleDelete(instructor._id)} // Assuming userId is the correct identifier
                        >
                          Make Admin
                        </button>
                        <button
                          className="bg-red-500 p-2 rounded-md text-white"
                          onClick={() => handleDelete(instructor._id)} // Assuming userId is the correct identifier
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeAdmin;
