import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../../components/sidebars/AdminSideBar";
import "./assets/css/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icons from "../../assets/icons/icons";

function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  async function fetchFeedbacks() {
    try {
      const response = await axios.get("http://localhost:5000/feedbacks");
      // For each feedback, fetch user information and combine them
      const feedbacksWithUserInfo = await Promise.all(
        response.data.map(async (feedback) => {
          const userResponse = await axios.get(
            `http://localhost:5000/users/find/${feedback.userId}`
          );
          const user = userResponse.data;
          return { ...feedback, user };
        })
      );
      setFeedbacks(feedbacksWithUserInfo);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  }

  async function handleDeleteFeedback(feedbackId) {
    try {
      await axios.delete(`http://localhost:5000/feedbacks/${feedbackId}`);
      fetchFeedbacks(); // Fetch feedbacks again after deletion
      toast.success("Feedback Deleted!", {
        theme: "colored",
      });
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  }

  async function handleToggleSlider(feedbackId, isAddedToSlider) {
    try {
      await axios.put(`http://localhost:5000/feedbacks/${feedbackId}`, {
        isAddedToSlider: !isAddedToSlider, // Toggle the value
      });
      fetchFeedbacks(); // Fetch feedbacks again after update
      if (!isAddedToSlider) {
        toast.success("Feedback Added To Slider!", {
          theme: "colored",
        });
      } else {
        toast.success("Feedback Removed From Slider!", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  }

  return (
    <div className="container-admin">
      <ToastContainer />
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
          <table className="dash-table" id="feedback-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  {feedbacks.map((feedback, index) => (
    <tr key={index}>
      <td>{feedback.user ? (feedback.user.firstName || 'Anonymous') : 'Anonymous'}</td>
      <td>{feedback.user ? (feedback.user.lastName || '') : ''}</td>
      <td>{feedback.user ? (feedback.user.email || 'Anonymous') : 'Anonymous'}</td>
      <td>{feedback.text}</td>
      <td>
        <button
          className={
            feedback.isAddedToSlider
              ? 'bg-red-600 rounded-lg p-2 m-2'
              : 'bg-green-600 rounded-lg p-2 m-2'
          }
          onClick={() =>
            handleToggleSlider(feedback._id, feedback.isAddedToSlider)
          }
        >
          {feedback.isAddedToSlider ? 'Remove' : 'Add'}
        </button>
        <button
          className="bg-red-600 rounded-lg p-2 m-2"
          onClick={() => handleDeleteFeedback(feedback._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FeedbacksPage;
