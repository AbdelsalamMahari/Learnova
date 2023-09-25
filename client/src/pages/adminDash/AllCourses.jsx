import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import UserInfo from '../../components/users/UserInfo';
import SideBar from '../../components/sidebars/AdminSideBar';
import Icons from '../../assets/icons/icons';
import "./assets/css/style.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const user = UserInfo();

    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const response = await Axios.get('http://localhost:5000/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching course data:', error);
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

        fetchAllCourses();
        fetchInstructors();
    }, []);

    // Function to get instructor information for a given instructor ID
    const getInstructorInfo = (instructorId) => {
        const instructor = instructors.find((inst) => inst._id === instructorId);
        return instructor
            ? (
                <div>
                    <p><b>Name:<br/>
                        </b> {instructor.firstName}{instructor.lastName}  </p>
                    <p><b>Email: </b> {instructor.email}</p>
                </div>
            )
            : 'Instructor not found';
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            // Delete course and associated questions
            await Axios.delete(`http://localhost:5000/delete/${courseId}`);
            // Remove the deleted course from the state
            setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
            toast.success('Course and associated questions deleted successfully.');
        } catch (error) {
            console.error('Error deleting course and associated questions:', error);
            toast.error('An error occurred while deleting the course.');
        }
    };

    return (
        <>
            <div className="container-admin">
                <SideBar />
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
                    </div>
                    <div className="dash-container">
                        <div className="couses-header">
                    <h1><b>All Courses : </b></h1>
                    </div>
                        <div className="courses-dash">
                            {courses.map((course) => (
                                <div key={course._id} className="course-card">
                                    <div className="course-info">
                                        <h2>#{course.name}</h2>
                                        <p> <b>Category:</b> {course.category}</p>
                                        <p><b>Instructor Information: </b><br/> {getInstructorInfo(course.instructor)}</p>
                                    </div>
                                    <button className="delete-button" onClick={() => handleDeleteCourse(course._id)}>
                                        Delete Course
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={3000} /> {/* Toast container */}
        </>
    );
};

export default AllCourses;
