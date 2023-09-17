import React from "react";
import "./Pricing.css"; // You can remove this line if not needed
import TopPage from "../../components/topPage/TopPage";
import Footer from "../../layout/footer/Footer";
import Icons from "../../assets/icons/icons";

export default function Pricing() {
  return (
    <>
      <TopPage
        title="Pricing"
        backgroundImageUrl="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/02/bg-05-free-img.jpg"
      />
      <div className="container mx-auto my-10">
        <div className="flex justify-center space-x-8">
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
                  Course Learning Checks
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
                  Course Learning Checks
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
                  Course Learning Checks
                </li>
                <li className="flex gap-1 items-center">
                  <span>
                    <Icons.Check size={20} />
                  </span>
                  Certificate of Completion
                </li>
              </ul>
            </div>
            <button className="mt-4 bg-orange hover:bg-blue-700 text-white py-2 px-4 rounded-full">
              Purchase
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
