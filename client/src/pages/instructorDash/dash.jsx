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
    const [totalEnrollments, setTotalEnrollments] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [successfulStudents, setSuccessfulStudents] = useState(0);

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
                    const totalEnrollments = response.data.length;
                    setTotalEnrollments(totalEnrollments);
                    setEnrollments(response.data);

                    // Count successful students with exam score >= 50
                    const successfulStudentsCount = response.data.reduce((count, enrollment) => {
                        const examScore = enrollment.user?.examScore || 0;
                        return examScore >= 50 ? count + 1 : count;
                    }, 0);
                    setSuccessfulStudents(successfulStudentsCount);
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
            console.error(`Error fetching score for user ${userId}, course ${courseId}:, error`);
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

        // Determine the color based on the score range
        const scoreColor = score >= 0 && score <= 2 ? "red" : "green";

        return (
            <div style={{ color: scoreColor }}>
                {score !== null ? score : "Loading score..."}
            </div>
        );
    };

    const getExamScoreForCourse = async (userId, courseId) => {
        try {
            const response = await Axios.get(
                `http://localhost:5000/${userId}/examScore/${courseId}`
            );
            return response.data.score;
        } catch (error) {
            console.error(`Error fetching exam score for user ${userId}, course ${courseId}:, error`);
            return 0; // Return 0 if an error occurs
        }
    };
    const ExamScoreDisplay = ({ userId, courseId }) => {
        const [examScore, setExamScore] = useState(null);

        useEffect(() => {
            getExamScoreForCourse(userId, courseId).then((score) => {
                setExamScore(score);
            });
        }, [userId, courseId]);

        const examScoreColor = examScore >= 0 && examScore <= 49 ? "red" : "green";

        return (
            <div style={{ color: examScoreColor }}>
                {examScore !== null ? examScore : "Loading exam score..."}
            </div>
        );
    };

    useEffect(() => {
        const fetchTotalCourses = async () => {
            try {
                if (user && user._id) {
                    const response = await Axios.get(`http://localhost:5000/courses/instructor/${user._id}/courses`);
                    setTotalCourses(response.data.length);
                }
            } catch (error) {
                console.error("Error fetching total courses:", error);
            }
        };

        fetchTotalCourses();
    }, [user]);

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
                                <div className="numbers">{totalEnrollments}</div>
                                <div className="cardName">Total Enrollments</div>
                            </div>

                            <div className="iconBx">
                                <ion-icon name="eye-outline"></ion-icon>
                            </div>
                        </div>

                        <div className="card">
                        <div>
                                <div className="numbers">{totalCourses}</div>
                                <div className="cardName">Total Course Number</div>
                            </div>

                            <div className="iconBx">
                                <ion-icon name="cart-outline"></ion-icon>
                            </div>
                        </div>

                        <div className="card">
                        <div>
                            <div className="numbers">{successfulStudents}</div>
                            <div className="cardName">Successful Students</div>
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
                                        <th>Student User</th>
                                        <th>Course</th>
                                        <th>Score Questions</th>
                                        <th>Exam Score</th>
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
                                            <td>
                                                {enrollment.user && enrollment.course ? (
                                                    <ExamScoreDisplay
                                                        userId={enrollment.user._id}
                                                        courseId={enrollment.course._id}
                                                    />
                                                ) : (
                                                    "Exam Score not available"
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