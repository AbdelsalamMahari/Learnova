import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import UserInfo from '../../components/users/UserInfo';
import SideBar from '../../components/sidebars/AdminSideBar'
import Icons from '../../assets/icons/icons';
import "./assets/css/style.css";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const user = UserInfo();



  const filteredInstructors = instructors.filter(instructor => {
    const fullName = `${instructor.firstName} ${instructor.lastName}`.toLowerCase();
    const email = instructor.email.toLowerCase();
    const phoneNumber = instructor.phoneNumber.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    return fullName.includes(searchTermLower) || email.includes(searchTermLower) || phoneNumber.includes(searchTermLower);
  });


  const fetchInstructors = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/users/allInstructor", {
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
    fetchInstructors();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await Axios.delete(`http://localhost:5000/users/${userId}`, {
        headers: {
          token: `Bearer ${Cookies.get("token")} `,
        },
      });

      toast.success("User deleted successfully", {
        theme: "colored",
      });

      fetchInstructors();
    } catch (error) {
      console.error("Error deleting instructor:", error);
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
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                    <th>Phone Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstructors.map((instructor, index) => (
                    <tr key={index}>
                      <td>{instructor.firstName}</td>
                      <td>{instructor.lastName}</td>
                      <td>{instructor.email}</td>
                      <td>{instructor.phoneNumber}</td>
                      <td className="flex justify-center items-center gap-2">
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

export default AllInstructors;
