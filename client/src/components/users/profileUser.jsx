import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const ProfileUser = ({ user }) => {
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [isImageSelected, setIsImageSelected] = useState(false); // Track whether an image is selected
  const [Profile, setProfile] = useState(user.profilePic); // Store the previous profile picture

  const handleProfilePicChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setProfilePic(selectedFile); // Display the selected image
      setProfile(selectedFile.name); // Display the selected image
      setIsImageSelected(true); // Image is selected
    } else {
      setIsImageSelected(false); // No image selected
    }
  };

  const handleCancel = () => {
    // Restore the previous profile picture
    setProfile(user.profilePic);
    setIsImageSelected(false);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("profilePic", profilePic);

      const profilePicResponse = await axios.post(
        `http://localhost:5000/users/profile/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user!", {
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <ToastContainer />
        <div className="rounded-full flex justify-center items-center border-lin">
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
          <label
            htmlFor="photo-upload"
            className="cursor-pointer block w-28 h-28"
          >
            {user.profilePic ? (

            <img
              src={`http://localhost:5000/users/userProfile/${user._id}`}
              alt="Upload"
              className="w-28 h-28 rounded-full object-cover"
            />
            ) : (
              <img src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max" alt="Default Profile"
              className="w-28 h-28 rounded-full object-cover"/>)}
          </label>
        </div>
        <div className="flex justify-center items-start flex-col ml-4">
          <h1 className="md:text-lg lg:text-xl font-bold">
            {user.firstName} {user.lastName}
          </h1>
          <p>{user.email}</p>
        </div>
      </div>
      {isImageSelected && (
        <div className="flex justify-end">
          <button className="px-2 py-3 m-2 rounded-md bg-green-600 text-white" onClick={handleUpdate}>Update</button>
          <button className="px-2 py-3 m-2 rounded-md bg-red-600 text-white" onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default ProfileUser;
