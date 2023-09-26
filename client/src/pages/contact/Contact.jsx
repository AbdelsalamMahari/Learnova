import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TopPage from "../../components/topPage/TopPage";
import Footer from "../../layout/footer/Footer";
import "./Contact.css";
import Icons from "../../assets/icons/icons";
import { Link } from "react-router-dom";

export default function Contact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/contacts/save";
      const { data: res } = await axios.post(url, data);
      toast.success(res.msg, {
        theme: "colored",
      });
      // Clear the input fields after a successful submission
      setData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        toast.error(err.response.data.msg, {
          theme: "colored",
        });
      }
    }
  };

  return (
    <>
      <TopPage
        title="Get in Touch"
        backgroundImageUrl="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/02/bg-06-free-img.jpg"
      />
      <div className="flex my-20 mx-[40px]">
        <div className="flex-1 flex justify-start items-start mt-10 pr-5">
          {/* Left Column */}
          <div>
            <h1 className=" text-4xl lg:text-4xl xl:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <div
              className="tilted-box"
              style={{ "--skew-angle": "40deg" }}
            ></div>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            {/* Location */}
            <div className="mt-10">
              <div className="flex">
                <span><Icons.Location size={20} className="mr-2" /></span>
                <p>Your Address, City, Country</p>
              </div>

              {/* Email */}
              <div className="flex">
                <span><Icons.Email size={20} className="mr-2" /></span>
                <p>example@example.com</p>
              </div>

              {/* Phone Number */}
              <div className="flex">
                <span><Icons.Phone size={20} className="mr-2" /></span>
                <p>+123 456 789</p>
              </div>
            </div>
            <div className="survey-submit mt-20">
            <p className="text-4xl lg:text-4xl xl:text-5xl mb-4 font-bold"> Help Us Improve!</p>
              <div
                className="tilted-box"
                style={{ "--skew-angle": "40deg" }}
              ></div>
              <p className="text-lg mb-4">We value your feedback! Help us enhance your experience by filling out our survey.</p>
              <div className="flex mt-9">
                  <button className="bg-orange rounded-full text-white px-4 py-2">
                  <Link to="/survey">Take our survey and help us improve!</Link>
                  </button>
                </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center w-full">
              {/* Container with rounded corners and background color */}
              <div
                className="rounded-lg bg-white p-10 w-full shadow-2xl"
              >
                <h1 className="md:text-2xl lg:text-2xl xl:text-2xl font-bold">
                  Have a Questions?
                </h1>
                <br></br>
                <p className="mb-6">
                  Feel free to reach out to us. We'd love to hear from you!
                </p>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="input-field bg-gray-100 px-4 py-2 w-full border border-s-pink2 rounded input-contact"
                    placeholder="Your Name"
                    onChange={handleChange}
                    value={data.name}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input-field bg-gray-100 px-4 py-2 w-full border border-s-pink2 rounded input-contact"
                    placeholder="Your Email"
                    onChange={handleChange}
                    value={data.email}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="input-field bg-gray-100 px-4 py-2 w-full border border-s-pink2 rounded input-contact"
                    placeholder="Your Phone Number"
                    onChange={handleChange}
                    value={data.phone}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="input-field bg-gray-100 px-4 py-2 w-full border border-s-pink2 rounded input-contact"
                    placeholder="Subject"
                    onChange={handleChange}
                    value={data.subject}
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    className="input-field bg-gray-100 px-4 py-2 w-full border border-s-pink2 rounded input-contact"
                    placeholder="Write your message here..."
                    onChange={handleChange}
                    value={data.message}
                    required
                  />
                </div>
                <div className="flex justify-center mt-5">
                  <button className="bg-pink2 text-black font-bold py-2 px-4 rounded button-contact input-contact">
                    Send Message
                  </button>
                </div>
              </div>
              {/* End of Container */}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
