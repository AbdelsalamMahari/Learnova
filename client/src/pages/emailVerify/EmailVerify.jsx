import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();


  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      {validUrl ? (
        <div>
          <h1 className="text-5xl flicklogo font-bold">Email verified successfully!</h1>
          <Link to="/login">
            <button className="bg-orange text-white font-bold py-2 px-4 mt-5 rounded-full">Login</button>
          </Link>
        </div>
      ) : (
        <div>Token not valid</div>
      )}
    </div>
  );
};

export default EmailVerify;
