import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import UserInfo from '../../components/users/UserInfo';

import "./assets/css/style.css";
import Cookies from 'js-cookie';
const Instructorss = () => {
  const [instructors, setInstructors] = useState([]);
  const user = UserInfo();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/users/allInstructor');
        setInstructors(response.data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    fetchInstructors();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await Axios.delete(`http://localhost:5000/users/${userId}`, {
        headers: {
          token: `Bearer ${Cookies.get("token")} `,
         },
        });
    } catch (error) {
      console.error('Error deleting instructor:', error);
    }
  };

  return (
    <>
      <div className="container-admin">
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
              {instructors.map((instructor, index) => (
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
    </>
  );
};

export default Instructorss;
