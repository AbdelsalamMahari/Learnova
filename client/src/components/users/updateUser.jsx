import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const UpdateUser = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = {
        firstName: firstName,
        lastName: lastName,
      };
  
      // Send a PUT request to update the user's information
      const updateUserResponse = await axios.put(
        `http://localhost:5000/users/${user._id}`,
        updatedUser,
        {
          headers: {
            token: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
  
      if (updateUserResponse.status === 200) {
        console.log("User updated:", updateUserResponse.data);
        toast.success("User Updated Successfully!", {
          theme: "colored",
        });
      } else {
        toast.error("Error updating user!", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user!", {
        theme: "colored",
      });
    }
  };
  

  return (
    <div className="flex flex-col p-8">
      <div>
        <h1 className="text-2xl mb-5">Update Your Personal Information</h1>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1 text-gray-500">First Name <span className="text-pink2">*</span></label>
        <input
          type="text"
          className="input-field bg-gray-100 px-4 py-4 w-full border border-s-pink2"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1 text-gray-500">Last Name <span className="text-pink2">*</span></label>
        <input
          type="text"
          className="input-field bg-gray-100 px-4 py-4 w-full border border-s-pink2"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleUpdate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateUser;
