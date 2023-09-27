import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../../layout/navbar/Navbar";
import Logo from "../../assets/images/LearnovaColoredLogo2.png";
import Footer from "../../layout/footer/Footer";
import UserInfo from "../../components/users/UserInfo";
import UpdateUser from "./../../components/users/updateUser";
import ProfileUser from "./../../components/users/profileUser";
import ResetPassUser from "./../../components/users/resetPassword";
import MakeInstructor from "./../../components/users/makeInstructor";
import "./Profile.css";
import Loading from "../../components/loading/loading";

export default function Profile() {
  const user = UserInfo();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isMakeInstOpen, setIsMakeInstOpen] = useState(false);

  const handleEditToggle = () => {
    if (!isEditOpen) {
      setIsEditOpen(true);
      setIsProfileOpen(false);
      setIsPassOpen(false);
      setIsMakeInstOpen(false);
    }
  };

  const handleProfileToggle = () => {
    if (!isProfileOpen) {
      setIsProfileOpen(true);
      setIsEditOpen(false);
      setIsPassOpen(false);
      setIsMakeInstOpen(false);
    }
  };

  const handlePassToggle = () => {
    if (!isPassOpen) {
      setIsPassOpen(true);
      setIsProfileOpen(false);
      setIsEditOpen(false);
      setIsMakeInstOpen(false);
    }
  };

  const handleMakeInstToggle = () => {
    if (!isMakeInstOpen) {
      setIsPassOpen(false);
      setIsProfileOpen(false);
      setIsEditOpen(false);
      setIsMakeInstOpen(true);
    }
  };

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
      <div className="">
        {user ? (
          <>
            <section className="section-profile-info flex my-20">
              <div className="profile-info-btn w-1/4 flex ml-10 flex-col gap-2">
                <div>
                  <button
                    onClick={handleProfileToggle}
                    className={`${
                      isProfileOpen ? "bg-orange text-white" : "bg-gray-200"
                    } text-black font-bold py-3 px-4 w-64 hover:bg-orange profile-btns`}
                  >
                    Profile
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleEditToggle}
                    className={`${
                      isEditOpen ? "bg-orange text-white" : "bg-gray-200"
                    } text-black font-bold py-3 px-4 w-64 hover:bg-orange profile-btns`}
                  >
                    Edit
                  </button>
                </div>
                {!user.googleId && (
                  <div>
                    <button
                      onClick={handlePassToggle}
                      className={`${
                        isPassOpen ? "bg-orange text-white" : "bg-gray-200"
                      } text-black font-bold py-3 px-4 w-64 hover:bg-orange profile-btns`}
                    >
                      Password
                    </button>
                  </div>
                )}
                <div>
                  {user && !user.isInstructor && (
                    <button
                      onClick={handleMakeInstToggle}
                      className={`${
                        isMakeInstOpen ? "bg-orange text-white" : "bg-gray-200"
                      } text-black font-bold py-3 px-4 w-64 hover:bg-orange profile-btns`}
                    >
                      Request
                    </button>
                  )}
                </div>
                <div>
                  <button
                    className="bg-gray-200 text-black hover:bg-red-600 hover:text-white font-bold py-3 px-4 w-64 profile-btns"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className="bg-white profile-dynamic flex-1 flex flex-col border shadow-2xl rounded-lg mr-8">
                {/*  */}
                {isEditOpen && <UpdateUser user={user} />}
                {/*  */}
                {isProfileOpen && <ProfileUser user={user} />}
                {/*  */}
                {isPassOpen && <ResetPassUser user={user} />}
                {/*  */}
                {isMakeInstOpen && <MakeInstructor user={user} />}
                {/*  */}
              </div>
            </section>
          </>
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </>
  );
}
