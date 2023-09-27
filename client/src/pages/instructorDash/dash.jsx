import React, { useEffect, useState } from "react";
import "./assets/css/style.css";
import Axios from "axios";
import Sidebar from "../../components/sidebars/InstructorSideBar";
import Icons from "../../assets/icons/icons";
import Logo from "../../assets/images/LearnovaColoredLogo2.png";
import UserInfo from "../../components/users/UserInfo";
import Loading from "../../components/loading/loading"

export default function Dash() {
  const user = UserInfo();
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [enrollments, setEnrollments] = useState([]);
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalSuccess, setTotalSuccess] = useState(0);
  const [searchText, setSearchText] = useState(""); 


  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const userFullName = `${enrollment.user.firstName} ${enrollment.user.lastName}`.toLowerCase();
    const courseName = enrollment.course.name.toLowerCase();
    const searchLowerCase = searchText.toLowerCase();

    // Check if the search text matches the user's full name or course name
    return userFullName.includes(searchLowerCase) || courseName.includes(searchLowerCase);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user._id) {
          const response = await Axios.get(
            `http://localhost:5000/users/balance/${user._id}`
          );
          setTotalAmount(response.data.balance);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching total subscription amount:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

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
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        setLoading(false);
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
      console.error(
        `Error fetching score for user ${userId}, course ${courseId}:`,
        error
      );
      return 0;
    }
  };

  const ScoreDisplay = ({ userId, courseId }) => {
    const [score, setScore] = useState(null);

    useEffect(() => {
      getScoreForCourse(userId, courseId).then((score) => {
        setScore(score);
      });
    }, [userId, courseId]);

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
      console.error(
        `Error fetching exam score for user ${userId}, course ${courseId}:`,
        error
      );
      return 0;
    }
  };

  const ExamScoreDisplay = ({ userId, courseId }) => {
    const [examScore, setExamScore] = useState(null);
  
    useEffect(() => {
      getExamScoreForCourse(userId, courseId)
        .then((score) => {
          setExamScore(score);
        })
        .catch(() => {
          console.error(
            `Error fetching exam score for user ${userId}, course ${courseId}. Setting exam score to null.`
          );
          setExamScore(null); // Set exam score to null in case of an error
        });
    }, [userId, courseId]);
  
    const displayScore = examScore !== null ? (examScore === 0 ? "In progress!!" : examScore) : "Loading exam score...";
    const examScoreColor = examScore >= 0 && examScore <= 49 ? "red" : "green";
  
    return (
      <div style={{ color: examScoreColor }}>
        {displayScore}
      </div>
    );
  };
  

  useEffect(() => {
    const fetchTotalCourses = async () => {
      try {
        if (user && user._id) {
          const response = await Axios.get(
            `http://localhost:5000/courses/instructor/${user._id}/courses`
          );
          setTotalCourses(response.data.length);
        }
      } catch (error) {
        console.error("Error fetching total courses:", error);
      }
    };

    fetchTotalCourses();
  }, [user]);

  const fetchExamScoresCount = async (courseId) => {
    try {
      const response = await Axios.get(
        `http://localhost:5000/countScores/${courseId}`
      );
      return response.data.count;
    } catch (error) {
      console.error(`Error fetching exam scores count for course ${courseId}:`, error);
      return 0;
    }
  };
  
  useEffect(() => {
    const updateTotalSuccess = async () => {
      if (enrollments.length === 0) return;
  
      // Fetch total success count for each enrollment
      const successCounts = await Promise.all(
        enrollments.map(async (enrollment) => {
          const courseId = enrollment.course._id;
  
          // Fetch exam score count only if the course ID matches
          if (courseId === enrollment.course._id) {
            const count = await fetchExamScoresCount(courseId);
            return count;
          }
  
          return 0;
        })
      );
  
      const totalSuccessCount = successCounts.reduce((acc, count) => acc + count, 0);
      setTotalSuccess(totalSuccessCount);
    };
  
    updateTotalSuccess();
  }, [enrollments]);
  

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <div className="container-dash">
          <Sidebar />
          <div className="main-dash">
            <div className="topbar">
              <div className="toggle">
                <Icons.Bars size={24} />
              </div>

              <div className="search">
          <label>
            <input
              type="text"
              placeholder="Search here"
              value={searchText}
              onChange={handleSearch}
            />
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
                  <div className="numbers">{totalSuccess}</div>
                  <div className="cardName">Total Success</div>
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
                      <th>Course Name</th>
                      <th>Score Questions</th>
                      <th>Exam Score</th>
                    </tr>
                  </thead>
                  <tbody>
                  {filteredEnrollments.map((enrollment) => (
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
      )}
    </>
  );
}
