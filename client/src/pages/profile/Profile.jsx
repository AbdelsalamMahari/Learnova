import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";
import Cookies from "js-cookie";
import Navbar from "../../layout/navbar/Navbar";
import Logo from "../../assets/images/LearnovaColoredLogo2.png";
import Footer from "../../layout/footer/Footer";

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
      await axios.get("http://localhost:5000/auth/logout");
      Cookies.remove("token");
      window.location = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
      <Navbar imgSrc={Logo} className={"bg-white relative"} />
      <div className="flex justify-center items-center flex-col my-20">
        {user ? (
          <>
            <div>{user.email}</div>
            <div>
              <button onClick={handleLogout} className="bg-red-600 rounded">Logout</button>
            </div>
          </>
        ) : (
          <p>Loading...</p> // You can replace this with a loading spinner or any other UI element.
        )}
      </div>
      <Footer />
    </>
  );
}
