import React, { useEffect, useState } from "react";
import Axios from "axios"; // Import Axios
import "./assets/css/style.css";
import Sidebar from "../../components/sidebars/AdminSideBar";
import Icons from "../../assets/icons/icons";
import Logo from "../../assets/images/LearnovaColoredLogo2.png";
import Cookies from "js-cookie";

export default function AdminDash() {
  const [totalSubscriptionAmount, setTotalSubscriptionAmount] = useState(0);
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Make a GET request to your backend API to get the total subscription amount
    Axios.get("http://localhost:5000/subscriptions/total")
      .then((response) => {
        setTotalSubscriptionAmount(response.data.totalAmount);
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
  return (
    <>
      <div className="container-admin">
        <Sidebar />
        <div className="main-admin">
          <div className="topbar">
            <div className="toggle">
              <Icons.Bars size={24} />
            </div>

            <div className="search">
              <label>
                <input type="text" placeholder="Search here" />
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
                    <td>Name</td>
                    <td>Price</td>
                    <td>Payment</td>
                    <td>Status</td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Star Refrigerator</td>
                    <td>$1200</td>
                    <td>Paid</td>
                    <td>
                      <span className="status delivered">Delivered</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Dell Laptop</td>
                    <td>$110</td>
                    <td>Due</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Apple Watch</td>
                    <td>$1200</td>
                    <td>Paid</td>
                    <td>
                      <span className="status return">Return</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Addidas Shoes</td>
                    <td>$620</td>
                    <td>Due</td>
                    <td>
                      <span className="status inProgress">In Progress</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Star Refrigerator</td>
                    <td>$1200</td>
                    <td>Paid</td>
                    <td>
                      <span className="status delivered">Delivered</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Dell Laptop</td>
                    <td>$110</td>
                    <td>Due</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Apple Watch</td>
                    <td>$1200</td>
                    <td>Paid</td>
                    <td>
                      <span className="status return">Return</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Addidas Shoes</td>
                    <td>$620</td>
                    <td>Due</td>
                    <td>
                      <span className="status inProgress">In Progress</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="recentCustomers">
              <div className="cardHeader">
                <h2>Recent Customers</h2>
              </div>

              <table>
                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="assets/imgs/customer02.jpg" alt="user" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      David <br /> <span>Italy</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="assets/imgs/customer01.jpg" alt="user" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      Amit <br /> <span>India</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="assets/imgs/customer02.jpg" alt="user" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      David <br /> <span>Italy</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="assets/imgs/customer01.jpg" alt="user" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      Amit <br /> <span>India</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="assets/imgs/customer02.jpg" alt="user" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      David <br /> <span>Italy</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="assets/imgs/customer01.jpg" alt="user" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      Amit <br /> <span>India</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="assets/imgs/customer01.jpg" alt="user" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      David <br /> <span>Italy</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="assets/imgs/customer02.jpg" alt="user" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      Amit <br /> <span>India</span>
                    </h4>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
