import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pricing.css";
import StripeContainer from "../../components/payment/StripeContainer";
import TopPage from "../../components/topPage/TopPage";
import Footer from "../../layout/footer/Footer";
import Icons from "../../assets/icons/icons";
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";

export default function Pricing() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState(null); // Amount in cents
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfoFromToken();
      setUser(userInfo);
    }

    getUserInfo();
  }, []);

  const handlePaymentSuccess  = async () => {
    try {
      const response = await axios.post("http://localhost:5000/subscriptions", {
        userId: user._id, // Pass the user's unique identifier
        plan: selectedPlan,
        amount: amount,
      });
      console.log(response.data.message);
      // Refresh user subscriptions after creating a new one
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <TopPage
        title="Pricing"
        backgroundImageUrl="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/02/bg-05-free-img.jpg"
      />
      <div className="container mx-auto my-10 px-[40px]">
        <div className="flex justify-center gap-10 pricing-divs">
          <div className="bg-white rounded-lg px-8 py-10 shadow-2xl text-center">
            <h2 className="">Free</h2>
            <p className="my-4">
              <span className="text-4xl font-semibold">0$</span> /Month
            </p>
            <div
              className="tilted-box2 w-1/4 m-auto"
              style={{ "--skew-angle": "40deg" }}
            ></div>
            <div className="text-left my-3 leading-8">
              <ul>
                <li className="flex gap-1 items-center">
                  <span>
                    <Icons.Check size={20} />
                  </span>
                  Read All Chapters
                </li>
                <li className="flex gap-1 items-center">
                  <span>
                    <Icons.Check size={20} />
                  </span>
                  Exercise Files
                </li>
                <li className="flex gap-1 items-center text-gray-400">
                  <span>
                    <Icons.Close size={20} />
                  </span>
                  Courses Exams
                </li>
                <li className="flex gap-1 items-center text-gray-400">
                  <span>
                    <Icons.Close size={20} />
                  </span>
                  Certificate of Completion
                </li>
              </ul>
            </div>
            <button className="mt-4 bg-orange hover:bg-blue-700 text-white py-2 px-4 rounded-full">
              Get Started
            </button>
          </div>
          {/* Plan 1 */}
          <div className="bg-white rounded-lg px-8 py-10 shadow-2xl text-center">
            <h2 className="">Monthly</h2>
            <p className="my-4">
              <span className="text-4xl font-semibold">9.99$</span> /Month
            </p>
            <div
              className="tilted-box2 w-1/4 m-auto"
              style={{ "--skew-angle": "40deg" }}
            ></div>
            <div className="text-left my-3 leading-8">
              <ul>
                <li className="flex gap-1 items-center">
                  <span>
                    <Icons.Check size={20} />
                  </span>
                  Read All Chapters
                </li>
                <li className="flex gap-1 items-center">
                  <span>
                    <Icons.Check size={20} />
                  </span>
                  Exercise Files
                </li>
                <li className="flex gap-1 items-center">
                  <span>
                    <Icons.Check size={20} />
                  </span>
                  Courses Exams
                </li>
                <li className="flex gap-1 items-center text-gray-400">
                  <span>
                    <Icons.Close size={20} />
                  </span>
                  Certificate of Completion
                </li>
              </ul>
            </div>
            <button
                onClick={() => {
                  setSelectedPlan("monthly");
                  setAmount(9.99 * 100); // Monthly amount in cents
                  openModal();
                }}
              className="mt-4 bg-orange hover:bg-blue-700 text-white py-2 px-4 rounded-full"
            >
              Purchase
            </button>
          </div>

          {/* Plan 2 */}
          <div className="bg-blue text-white rounded-lg px-8 py-10 shadow-2xl text-center">
            <h2 className="">Annual</h2>
            <p className="my-4">
              <span className="text-4xl font-semibold">99.99$</span> /Year
            </p>
            <div
              className="tilted-box2 w-1/4 m-auto"
              style={{ "--skew-angle": "40deg" }}
            ></div>
            <div className="text-left my-3 leading-8">
              <ul>
                <li className="flex gap-1 items-center">
                  <span>
                    <Icons.Check size={20} />
                  </span>
                  Read All Chapters
                </li>
                <li className="flex gap-1 items-center">
                  <span>
                    <Icons.Check size={20} />
                  </span>
                  Exercise Files
                </li>
                <li className="flex gap-1 items-center">
                  <span>
                    <Icons.Check size={20} />
                  </span>
                  Courses Exams
                </li>
                <li className="flex gap-1 items-center">
                  <span>
                    <Icons.Check size={20} />
                  </span>
                  Certificate of Completion
                </li>
              </ul>
            </div>
            <button
                onClick={() => {
                  setSelectedPlan("annual");
                  setAmount(99.99 * 100); // Annual amount in cents
                  openModal();
                }}
              className="mt-4 bg-orange hover:bg-blue-700 text-white py-2 px-4 rounded-full"
            >
              Purchase
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto">
    {/* Modal Background */}
    <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
    {/* Modal Content */}
    <div className="modal fixed inset-0 flex items-center justify-center">
      <div className="modal-content bg-white w-1/3 p-6 rounded-lg shadow-lg relative">
        <button
          className="modal-close-btn absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={closeModal}
        >
          <Icons.Close/>
        </button>
        {/* Display the StripeContainer component within the modal */}
        <StripeContainer amount={amount} handlePaymentSuccess={handlePaymentSuccess}/>
      </div>
    </div>
  </div>
)}

      <Footer />
    </>
  );
}
