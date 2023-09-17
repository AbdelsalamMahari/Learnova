import React from "react";
import "./Pricing.css"; // You can remove this line if not needed
import TopPage from "../../components/topPage/TopPage";

export default function Pricing() {
  return (
    <>
      <TopPage
        title="Pricing"
        backgroundImageUrl="https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/02/bg-05-free-img.jpg"
      />
      <div className="container mx-auto mt-8">
        <div className="flex justify-center space-x-8">
          {/* Plan 1 */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-semibold">Monthly Plan</h2>
            <p className="text-gray-600">Access to our content for 30 days</p>
            <p className="text-3xl font-bold text-blue-600">$9.99</p>
            <button className="mt-4 bg-blue hover:bg-blue-700 text-white py-2 px-4 rounded-full">
              Purchase
            </button>
          </div>

          {/* Plan 2 */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-semibold">Annual Plan</h2>
            <p className="text-gray-600">Access to our content for 365 days</p>
            <p className="text-3xl font-bold text-blue-600">$99.99</p>
            <button className="mt-4 bg-blue hover:bg-blue-700 text-white py-2 px-4 rounded-full">
              Purchase
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
