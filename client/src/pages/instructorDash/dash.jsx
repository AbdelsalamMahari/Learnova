import React, { useEffect, useState } from "react";
import "./assets/css/style.css"
import Axios from "axios"; // Import Axios
import Sidebar from '../../components/sidebars/InstructorSideBar';
import Icons from '../../assets/icons/icons';
import Logo from '../../assets/images/LearnovaColoredLogo2.png'
import UserInfo from "../../components/users/UserInfo";

export default function Dash() {
    const user = UserInfo();
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

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

        const fetchAllEnrollments = async () => {
            try {
                const response = await Axios.get('http://localhost:5000/enrollments');
                setEnrollments(response.data);
            } catch (error) {
                console.error('Error fetching enrollment data:', error);
            }
        };

        const fetchInstructors = async () => {
            try {
                const response = await Axios.get('http://localhost:5000/users/allInstructor');
                setInstructors(response.data);
            } catch (error) {
                console.error('Error fetching instructors:', error);
            }
        };

        const fetchAllCourses = async () => {
            try {
                const response = await Axios.get('http://localhost:5000/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        const fetchUsers = async (userId) => {
            try {
                const response = await Axios.get(`http://localhost:5000/users/find/${userId}`);
                setUsers(prevUsers => ({
                    ...prevUsers,
                    [userId]: response.data
                }));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchAllEnrollments();
        fetchInstructors();
        fetchAllCourses();

        // Fetch user info for each enrollment
        enrollments.forEach(enrollment => {
            fetchUsers(enrollment.userId);
        });
    }, []);

    const getInstructorInfo = (instructorId) => {
        const instructor = instructors.find((inst) => inst._id === instructorId);
        return instructor ? (
            <>
                <tr>
                    <td><b>Name:</b></td>
                    <td>{instructor.firstName} {instructor.lastName}</td>
                </tr>
                <tr>
                    <td><b>Email:</b></td>
                    <td>{instructor.email}</td>
                </tr>
            </>
        ) : 'Instructor not found';
    };

    const getCourseInfo = (courseId) => {
        const course = courses.find((course) => course._id === courseId);
        return course ? `${course.name} - ${course.category}` : 'Course not found';
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
                                        <th>Instructor Information</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrollments.map((enrollment) => (
                                        <tr key={enrollment._id}>
                                            <td>{users[enrollment.userId] ? `${users[enrollment.userId].firstName} ${users[enrollment.userId].lastName}` : 'User not found'}</td>
                                            <td>{getCourseInfo(enrollment.courseId)}</td>
                                            <td>{getInstructorInfo(enrollment.instructorId)}</td>
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
