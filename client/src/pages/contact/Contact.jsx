import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TopPage from "../../components/topPage/TopPage";
import Footer from "../../layout/footer/Footer";
import './Contact.css';

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
      <div className="flex justify-center items-center h-screen  mt-10">
      <div className=" cont w-full md:w-1/2 p-6 flex flex-col items-center justify-center text-center px-4">
  {/* Left Column */}
  <div>
    <h1 className=" text-4xl lg:text-4xl xl:text-5xl font-bold mb-4">
      Contact Us
    </h1>
    <p className="mb-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
    </p>
       {/* Location */}
       <div className="flex items-center mb-2">
      <i className="fas fa-map-marker-alt text-pink2 text-2xl mr-2"></i>
      <p>Your Address, City, Country</p>
    </div>

    {/* Email */}
    <div className="flex items-center mb-2">
      <i className="fas fa-envelope text-pink2 text-2xl mr-2"></i>
      <p>example@example.com</p>
    </div>

    {/* Phone Number */}
    <div className="flex items-center">
      <i className="fas fa-phone text-pink2 text-2xl mr-2"></i>
      <p>+123 456 789</p>
    </div>

  </div>
</div>

        <div className="rounded-lg bg-gray-100 mb-16 p-4 mt-4 w-full md:w-2/3 lg:w-1/2 mx-2 shadow-xl ">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              {/* Container with rounded corners and background color */}
              <div
                className="rounded-lg bg-gray-100 p-4 w-full "
                style={{ maxWidth: "600px" }}
              >
                <h1 className="md:text-4xl lg:text-4xl xl:text-5xl font-bold mt-5">
                  Have a Question?
                </h1><br></br>
                <p className="mb-6">
                  Feel free to reach out to us. We'd love to hear from you!
                </p>
                <div className="mb-4">
                  <label htmlFor="name" className="input-label">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="input-field bg-gray-100 px-4 py-2 w-full border border-s-pink2 rounded"
                    placeholder="Your Name"
                    onChange={handleChange}
                    value={data.name}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="input-label">
                    Your Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input-field bg-gray-100 px-4 py-2 w-full border border-s-pink2 rounded"
                    placeholder="Your Email"
                    onChange={handleChange}
                    value={data.email}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="input-label">
                    Your Phone Number:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="input-field bg-gray-100 px-4 py-2 w-full border border-s-pink2 rounded"
                    placeholder="Your Phone Number"
                    onChange={handleChange}
                    value={data.phone}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="input-label">
                    Subject:
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="input-field bg-gray-100 px-4 py-2 w-full border border-s-pink2 rounded"
                    placeholder="Subject"
                    onChange={handleChange}
                    value={data.subject}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="input-label">
                    Your Message:
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    className="input-field bg-gray-100 px-4 py-2 w-full border border-s-pink2 rounded"
                    placeholder="Write your message here..."
                    onChange={handleChange}
                    value={data.message}
                    required
                  />
                </div>
                <div className="flex justify-center mt-5 mb-8">
                  <button className="bg-pink2 text-black font-bold py-2 px-4 rounded">
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
