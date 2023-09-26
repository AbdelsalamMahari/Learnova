import React, { useEffect, useState } from "react";
import "./assets/css/style.css"
import Axios from "axios"; // Import Axios
import Sidebar from '../../components/sidebars/InstructorSideBar';
import Icons from '../../assets/icons/icons';
import Logo from '../../assets/images/LearnovaColoredLogo2.png'
import UserInfo from "../../components/users/UserInfo";
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser"; // Update with the correct path

export default function Dash() {
    const user = UserInfo();
    const [totalAmount, setTotalAmount] = useState(0);
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        // Make a GET request to your backend API to get the total subscription amount
        if (user && user._id) {
            Axios.get(`http://localhost:5000/users/balance/${user._id}`)
                .then((response) => {
                    setTotalAmount(response.data.balance);
                })
                .catch((error) => {
                    console.error("Error fetching total subscription amount:", error);
                });
        }
    }, []);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                if (user && user._id) {
                    const response = await Axios.get(
                        `http://localhost:5000/get/enrollments/instructor/${user._id}`
                    );
                    setEnrollments(response.data);
                }
            } catch (error) {
                console.error("Error fetching enrollments:", error);
            }
        };

        fetchEnrollments();
    }, [user]);

    const getScoreForCourse = async (userId, courseId) => {
        try {
            const response = await Axios.get(
                `http://localhost:5000/${userId}/score/${courseId}`
            );
            return response.data.score;
        } catch (error) {
            console.error(`Error fetching score for user ${userId}, course ${courseId}:`, error);
            return 0; // Return 0 if an error occurs
        }
    };
    
const ScoreDisplay = ({ userId, courseId }) => {
    const [score, setScore] = useState(null);
  
    useEffect(() => {
      getScoreForCourse(userId, courseId).then((score) => {
        setScore(score);
      });
    }, [userId, courseId]);
  
    return score !== null ? score : "Loading score...";
  };

    return (
        <>
            <div className="container-dash">
                <Sidebar />
                <div className="main-dash">
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
                        <div className='w-32'>
                            <img src={Logo} alt='logo'></img>
                        </div>
                    </div>


                    <div className="cardBox">
                        <div className="card">
                            <div>
                                <div className="numbers">1,504</div>
                                <div className="cardName">Daily Views</div>
                            </div>

                            <div className="iconBx">
                                <ion-icon name="eye-outline"></ion-icon>
                            </div>
                        </div>

                        <div className="card">
                            <div>
                                <div className="numbers">80</div>
                                <div className="cardName">Sales</div>
                            </div>

                            <div className="iconBx">
                                <ion-icon name="cart-outline"></ion-icon>
                            </div>
                        </div>

                        <div className="card">
                            <div>
                                <div className="numbers">284</div>
                                <div className="cardName">Comments</div>
                            </div>

                            <div className="iconBx">
                                <ion-icon name="chatbubbles-outline"></ion-icon>
                            </div>
                        </div>

                        <div className="card">
                            <div>
                                <div className="numbers">${totalAmount}</div>
                                <div className="cardName">Earning</div>
                            </div>

                            <div className="iconBx">
                                <ion-icon name="cash-outline"></ion-icon>
                            </div>
                        </div>
                    </div>

                    <div className="dash-container">
                        <div className="couses-header">
                            <h1><b>All Enrollments : </b></h1>
                        </div>
                        <div className="table-container">
                            <table className="dash-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Course</th>
                                        <th>Score Questions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrollments.map((enrollment) => (
                                        <tr key={enrollment._id}>
                                            <td>
                                                {enrollment.user
                                                    ? `${enrollment.user.firstName} ${enrollment.user.lastName}`
                                                    : "User not found"}
                                            </td>
                                            <td>{enrollment.course ? enrollment.course.name : "Course not found"}</td>

                                            <td>
                                                {enrollment.user && enrollment.course ? (
                                                    <ScoreDisplay
                                                        userId={enrollment.user._id}
                                                        courseId={enrollment.course._id}
                                                    />
                                                ) : (
                                                    "Score not available"
                                                )}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
