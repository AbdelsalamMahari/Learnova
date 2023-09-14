import React from "react";
import Footer from "../../layout/footer/Footer";
import TopPage from "../../components/topPage/TopPage";
import { Link } from "react-router-dom";
import Button from "../../components/buttons/button";
import Navbar from "../../layout/navbar/Navbar";
import Logo from "../../assets/images/LearnovaColoredLogo2.png";

export default function NoPage() {
  return (
    <>
      <Navbar imgSrc={Logo} className={"bg-white relative"} />
      <div className="flex justify-center items-center flex-col py-20">
        <div>
          <img alt="Page Not Found"></img>
        </div>
        <h1 className="text-4xl font-bold mt-9">
          Sorry we can't find that page!
        </h1>
        <p className="mt-5 text-xl">
          The page you are looking for was never existed.
        </p>
        <Link to="/">
          <Button text={"Back To Home"} className={"mt-5"}></Button>
        </Link>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
