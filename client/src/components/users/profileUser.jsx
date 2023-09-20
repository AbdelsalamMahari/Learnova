import React from "react";

const ProfileUser = ({ user }) => {
  const imgURL="/usersProfiles/"
  return (
    <div className="flex justify-center items-center h-full">
      <div className="rounded-full flex justify-center items-center border-lin">
        <img
          className="w-28 h-28 rounded-full object-cover"
          src={
            imgURL+user.profilePic
              ? `${imgURL+user.profilePic}`
              : "https://img.freepik.com/free-icon/man_318-677829.jpg"
          }
          alt={user.firstName}
        />
      </div>
      <div className="flex justify-center items-start flex-col ml-4">
        <h1 className="md:text-lg lg:text-xl font-bold">
          {user.firstName} {user.lastName}
        </h1>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileUser;
