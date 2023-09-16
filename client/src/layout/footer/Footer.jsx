import React from "react";
import Logo from "../../assets/images/LearnovaColoredLogo.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-white text-black ">
        <div className="container  p-[40px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 py-4">
            {/* Footer Section 1 */}
            <div className=" md:col-span-2">
              <div className="flex items-center mb-4">
                <img src={Logo} alt="Logo" className="w-56 h-auto" />
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim.
              </p>
            </div>

            {/* Footer Section 2 */}
            <div className="">
              <h2 className="text-lg font-semibold mb-4">Site Links</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/" className=" hover:text-orange">
                    About
                  </a>
                </li>
                <li>
                  <a href="/" className=" hover:text-orange">
                    My account
                  </a>
                </li>
                <li>
                  <a href="/" className=" hover:text-orange">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/" className=" hover:text-orange">
                    All Course
                  </a>
                </li>
                <li>
                  <a href="/" className=" hover:text-orange">
                    Instructors
                  </a>
                </li>
              </ul>
            </div>

            {/* Footer Section 2 */}
            <div className="">
              <h2 className="text-lg font-semibold mb-4">Useful Links</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/" className=" hover:text-orange">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/" className=" hover:text-orange">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/" className=" hover:text-orange">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/" className=" hover:text-orange">
                    Feedback
                  </a>
                </li>
                <li>
                  <a href="/" className=" hover:text-orange">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Footer Section 3 */}
            <div className="">
              <h2 className="text-lg font-semibold mb-4">Contact Info</h2>
              <p>
                <strong>Address</strong>
                <br />
                123 Avenue, New York
              </p>
              <p>
                <strong>Phone</strong>
                <br />
                929-242-6868
              </p>
              <p>
                <strong>Email</strong>
                <br />
                <span className="hover:text-orange">Learnova.e@gmail.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section 4 */}
        <div className="bg-white px-[40px] py-[30px] border-t-2">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <p>&copy; 2023 Copyright</p>
              </div>
              <div>
                <p>ESA Coding Lab Team</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
