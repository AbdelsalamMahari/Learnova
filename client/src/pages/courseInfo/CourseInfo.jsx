import React, { useState } from "react";
import TopPage from "../../components/topPage/TopPage";
import Icons from "../../assets/icons/icons";
import Footer from "../../layout/footer/Footer"
import Button from "../../components/buttons/button"

export default function CourseInfo() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  return (
    <>
      <TopPage
        title="HTML5/CSS3 Essentials"
        backgroundImageUrl="https://as2.ftcdn.net/v2/jpg/01/34/59/53/1000_F_134595318_krCNHoUx2KWoFZhFPGtJQg6Bv6dkrBMR.jpg"
      />
      <section>
        <div className="m-10 p-10 bg-white rounded">
          <div>
            <h1 className="lg:text-4xl font-bold">Course Description</h1>
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
              ducimus quis est possimus cumque blanditiis esse ea accusantium
              doloremque illo autem sunt debitis, explicabo nostrum omnis, ex
              minus, atque ad.
            </p>
          </div>
          <div className="mt-10">
            <div className="flex justify-between">
            <h1 className="lg:text-4xl font-bold">Course Content</h1>
            <Button text="START"/>
            </div>
            <div className="mt-4">
              <h2
                onClick={() => toggleAccordion(0)}
                className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span>Introduction to HTML</span>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 ${
                    activeAccordion === 0 ? "rotate-180" : ""
                  } shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </h2>
              <div
                className={`${
                  activeAccordion === 0 ? "block" : "hidden"
                } p-5 border border-b-0 border-gray-200 dark:border-gray-700`}
              >
                <div className="bg-orange rounded-md p-3 flex gap-2 mb-5">
                  <div>
                    <Icons.BookMark size={24} className="text-white"/>
                  </div>
                  <div>
                    <h1 className="text-white">Lesson Content</h1>
                  </div>
                </div>
                <div className="px-3">
                  <p className="py-2 text-gray-500 dark:text-gray-400 border-b">
                    HTML Elements
                  </p>
                  <p className="py-2 text-gray-500 dark:text-gray-400">
                    HTML Attributes
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2
                onClick={() => toggleAccordion(2)}
                className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span>Introduction and Basics of CSS</span>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 ${
                    activeAccordion === 2 ? "rotate-180" : ""
                  } shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </h2>
              <div
                className={`${
                  activeAccordion === 2 ? "block" : "hidden"
                } p-5 border border-t-0 border-gray-200 dark:border-gray-700`}
              >
                <div className="px-3">
                  <p className="py-2 text-gray-500 dark:text-gray-400 border-b">
                    Anatomy of tags
                  </p>
                  <p className="py-2 text-gray-500 dark:text-gray-400">
                    Selectors in CSS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
