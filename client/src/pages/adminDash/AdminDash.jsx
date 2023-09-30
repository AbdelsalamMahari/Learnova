import React, { useEffect, useState } from "react";
import Axios from "axios"; // Import Axios
import "./assets/css/style.css";
import Sidebar from "../../components/sidebars/AdminSideBar";
import Icons from "../../assets/icons/icons";
import Logo from "../../assets/images/LearnovaColoredLogo2.png";
import Cookies from "js-cookie";
import Loading from "../../components/loading/loading"

export default function AdminDash() {
  const [totalSubscriptionAmount, setTotalSubscriptionAmount] = useState(0);
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");



  const filteredRecentPurchases = recentPurchases.filter((purchase) => {
    const usernameMatches = purchase.username.toLowerCase().includes(searchTerm.toLowerCase());
    const courseMatches = purchase.course.toLowerCase().includes(searchTerm.toLowerCase());
    return usernameMatches || courseMatches;
  });
  
  useEffect(() => {
    // Make a GET request to your backend API to get the total subscription amount
    Axios.get("http://localhost:5000/balance")
      .then((response) => {
        setTotalSubscriptionAmount(response.data.balance);
      })
      .catch((error) => {
        console.error("Error fetching total subscription amount:", error);
      });

    Axios.get("http://localhost:5000/users/allInstructor", {
      headers: {
        token: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
    Axios.get("http://localhost:5000/users/allStudents", {
      headers: {
        token: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
    Axios.get("http://localhost:5000/courses", {
      headers: {
        token: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch recent purchase data
    setIsLoading(true); // Set isLoading to true before making the request
    Axios.get("http://localhost:5000/purchases")
      .then((response) => {
        const purchaseData = response.data;

        // Map the purchase data to the required format
        const formattedPurchaseData = purchaseData.map((purchase) => ({
          username: `${purchase.firstName} ${purchase.lastName}`,
          course: purchase.courseName,
          balance: `$${purchase.amount}`,
        }));

        // Set the formatted purchase data in the state
        setRecentPurchases(formattedPurchaseData);
      })
      .catch((error) => {
        console.error("Error fetching recent purchases:", error);
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false after the request is completed
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading /> // Display loading spinner while data is being fetched
      ) : (
        <div className="container-admin">
          <Sidebar />
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <ion-icon name="search-outline"></ion-icon>
                </label>
              </div>
              <div className="w-32">
                <img src={Logo} alt="logo"></img>
              </div>
            </div>

            <div className="cardBox-admin">
              <div className="card">
                <div>
                  <div className="numbers">{courses.length}</div>
                  <div className="cardName">Courses</div>
                </div>

                <div className="iconBx">
                  <Icons.Book size={24} />
                </div>
              </div>

              <div className="card">
                <div>
                  <div className="numbers">{students.length}</div>
                  <div className="cardName">Students</div>
                </div>

                <div className="iconBx">
                  <Icons.Student size={24} />
                </div>
              </div>

              <div className="card">
                <div>
                  <div className="numbers">{instructors.length}</div>
                  <div className="cardName">Instructors</div>
                </div>

                <div className="iconBx">
                  <Icons.Teacher size={24} />
                </div>
              </div>

              <div className="card">
                <div>
                  <div className="numbers">${totalSubscriptionAmount}</div>
                  <div className="cardName">Earning</div>
                </div>

                <div className="iconBx">
                  <Icons.Dollar size={24} />
                </div>
              </div>
            </div>

            <div className="details">
              <div className="recentOrders">
                <div className="cardHeader">
                  <h2>Recent Orders</h2>
                  <a href="/" className="btn">
                    View All
                  </a>
                </div>

                <table>
                  <thead>
                    <tr>
                      <td>Username</td>
                      <td>Course Name</td>
                      <td>Balance</td>
                      <td>Status</td>
                    </tr>
                  </thead>

                  <tbody>
                  {filteredRecentPurchases.map((purchase, index) => (
                      <tr key={index}>
                        <td>{purchase.username}</td>
                        <td>{purchase.course}</td>
                        <td>{purchase.balance}</td>
                        <td>
                          <span className="status delivered">Paid</span>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
