import React from "react";
import { useState, useEffect } from "react";
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";
import Cookies from "js-cookie";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);
    }

    getUserInfo();
  }, []);
  const handleLogout = async () => {
    try {
      Cookies.remove("token");
      window.location = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div>
      {user ? (
        <>
          <div>{user.email}</div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <p>Loading...</p> // You can replace this with a loading spinner or any other UI element.
      )}
    </div>
  );
}
