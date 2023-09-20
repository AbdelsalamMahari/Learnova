import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const MakeInstructor = ({ user }) => {
  const [phoneNumber, setPhoneNumber] = useState("");


  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleUpdate = async () => {
    try {
        const updatedInst = {
            phoneNumber: phoneNumber,
            role: "instructor",
          };

      const response = await axios.put(
        `http://localhost:5000/users/${user._id}`,
        updatedInst,
        {
          headers: {
            token: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log("User updated:", response.data);
      toast.success("User Updated Successfully!", {
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user!", {
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex flex-col p-8">
      <div className="mb-4">
        <label className="block font-bold mb-1 text-gray-500">
          Phone Number
        </label>
        <input
          type="text"
          name="phonenumber"
          value={phoneNumber}
          className="input-field bg-gray-100 px-4 py-4 w-full border border-s-pink2"
          onChange={handlePhoneNumberChange}
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

export default MakeInstructor;
