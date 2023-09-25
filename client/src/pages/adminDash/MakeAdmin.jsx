import React, { useEffect, useState } from "react";
import Axios from "axios";
import UserInfo from "../../components/users/UserInfo";
import SideBar from "../../components/sidebars/AdminSideBar";
import Icons from "../../assets/icons/icons";
import "./assets/css/style.css";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MakeAdmin = () => {
  const [users, setUsers] = useState([]);
  const user = UserInfo();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/users", {
        headers: {
          token: `Bearer ${Cookies.get("token")} `,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await Axios.delete(`http://localhost:5000/users/${userId}`, {
        headers: {
          token: `Bearer ${Cookies.get("token")} `,
        },
      });

      toast.success("User deleted successfully", {
        theme: "colored",
      });

      fetchUsers();
    } catch (error) {
      console.error("Error deleting instructor:", error);
      toast.error("Error deleting user", {
        theme: "colored",
      });
    }
  };

  async function handleToggleAdmin(userId, isAdmin) {
    try {
      await Axios.put(
        `http://localhost:5000/users/${userId}`,
        { isAdmin: !isAdmin },
        {
          headers: {
            token: `Bearer ${Cookies.get("token")} `,
          },
        }
      );
      fetchUsers();
      if (!isAdmin) {
        toast.success("Promoted To Admin!", {
          theme: "colored",
        });
      } else {
        toast.success("Demoted To User!", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    ["firstName", "lastName", "email", "role"].some(
      (field) =>
        user[field]
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <ToastContainer />
      <div className="container-admin">
        <SideBar />
        <div className="main-admin">
          <div className="topbar">
            <div className="toggle">
              <Icons.Bars size={24} />
            </div>
            <div className="search">
              <label>
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ion-icon name="search-outline"></ion-icon>
              </label>
            </div>
          </div>
          <div className="dash-container">
            <div className="table-container">
              {filteredUsers.length === 0 ? (
                <p>No users found.</p>
              ) : (
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td className="flex justify-center items-center gap-2">
                          <button
                            className={
                              user.isAdmin
                                ? "bg-red-500 p-2 rounded-md text-white"
                                : "bg-green-500 p-2 rounded-md text-white"
                            }
                            onClick={() =>
                              handleToggleAdmin(
                                user._id,
                                user.isAdmin
                              )
                            }
                          >
                            {user.isAdmin ? "Remove Admin" : "Make Admin"}
                          </button>
                          <button
                            className="bg-red-500 p-2 rounded-md text-white"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeAdmin;
