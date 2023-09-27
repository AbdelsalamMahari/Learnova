import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from '../../components/users/UserInfo';
import SideBar from '../../components/sidebars/AdminSideBar';
import Icons from '../../assets/icons/icons';
import "./assets/css/style.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const user = UserInfo();

    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        const fetchInstructors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users/allInstructor');
                setInstructors(response.data);
            } catch (error) {
                console.error('Error fetching instructors:', error);
            }
        };

        fetchAllCourses();
        fetchInstructors();
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

    const handleDeleteCourse = async (courseId) => {
        try {
            // Delete course and associated questions
            await axios.delete(`http://localhost:5000/delete/${courseId}`);
            // Remove the deleted course from the state
            setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
            toast.success('Course and associated questions deleted successfully.');
        } catch (error) {
            console.error('Error deleting course and associated questions:', error);
            toast.error('An error occurred while deleting the course.');
        }
    };

    const handleDeployCourse = async (courseId) => {
        try {
         
            await axios.put(`http://localhost:5000/courses/update-deployable/${courseId}`, {
                deployable: true, 
            });
            
            setCourses((prevCourses) =>
                prevCourses.map((course) =>
                    course._id === courseId ? { ...course, deployable: true } : course
                )
            );
            const updatedCourse = courses.find((course) => course._id === courseId);
            console.log('Updated Course:', updatedCourse);
    
            toast.success('Course deployed successfully.');
        } catch (error) {
            console.error('Error deploying course:', error);
            toast.error('An error occurred while deploying the course.');
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
                        <div className="table-container">
                            <table className="dash-table">
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Category</th>
                                        <th>Instructor Information</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course) => (
                                        <tr key={course._id}>
                                            <td>
                                               
                                                <Link to={`http://localhost:3000/courseInfo/${course._id}`}>{course.name}</Link>
                                            </td>
                                            <td>{course.category}</td>
                                            <td>{getInstructorInfo(course.instructor)}</td>
                                            <td className='last-td'>
                                                <button className="delete-button" onClick={() => handleDeleteCourse(course._id)}>
                                                    Delete Course
                                                </button>
                                                {course.deployable === false && (
                                                    <button className="deploy-button" onClick={() => handleDeployCourse(course._id)}>
                                                        Deploy Course
                                                    </button>
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
            <ToastContainer autoClose={3000} /> 
        </>
    )
};

export default AllCourses;
