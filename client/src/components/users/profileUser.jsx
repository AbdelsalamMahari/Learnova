import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const ProfileUser = ({ user }) => {
  let imgURL = "/usersProfiles/";
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [isImageSelected, setIsImageSelected] = useState(false); // Track whether an image is selected
  const [Profile, setProfile] = useState(user.profilePic); // Store the previous profile picture

  if (user.profilePic.startsWith("http")) {
    imgURL = "";
  }

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
      // Create a new FormData object to send the user's profile picture
      const formData = new FormData();
      formData.append("image", profilePic);

      // Upload the profile picture using a POST request to http://localhost:5000/users/profile
      const profilePicResponse = await axios.post(
        "http://localhost:5000/users/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      // If the profile picture upload was successful, get the file name
      let newProfilePicFileName = "";
      if (profilePicResponse.status === 200) {
        newProfilePicFileName = profilePicResponse.data.fileName;
        console.log("Profile picture updated:", newProfilePicFileName);
      } else {
        toast.error("Error uploading profile picture!", {
          theme: "colored",
        });
      }

      // Create the updated user object with the new profile picture file name
      const updatedUser = {
        profilePic: newProfilePicFileName, // Include the file name here
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
            <img
              src={
                imgURL + Profile ||
                "https://img.freepik.com/free-icon/man_318-677829.jpg"
              }
              alt="Upload"
              className="w-28 h-28 rounded-full object-cover"
            />
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
