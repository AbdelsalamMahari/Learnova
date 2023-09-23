import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const MakeInstructor = ({ user }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCv = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };


  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("cv", selectedFile);
  
      const cvResponse = axios.post(
        `http://localhost:5000/users/cv/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
  
      const updatedInst = {
        phoneNumber: phoneNumber,
        role: "instructor",
      };
  
      const userUpdateResponse = axios.put(
        `http://localhost:5000/users/${user._id}`,
        updatedInst,
        {
          headers: {
            token: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
  
      // Use Promise.all to wait for both requests to complete
      const [cvResult, updateUserResult] = await Promise.all([
        cvResponse,
        userUpdateResponse,
      ]);
  
      console.log("CV Upload Result:", cvResult.data);
      console.log("User Update Result:", updateUserResult.data);
  
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
            <div>
        <h1 className="text-2xl mb-5">Please provide your phone number to initiate your instructor request.</h1>
      </div>
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
      <div className="mb-4">
        <label className="block font-bold mb-1 text-gray-500">
          Phone Number
        </label>
        <input
          type="file"
          name="cv"
          className="input-field bg-gray-100 px-4 py-4 w-full border border-s-pink2"
          onChange={handleCv}
          accept=".pdf"
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleUpdate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MakeInstructor;
