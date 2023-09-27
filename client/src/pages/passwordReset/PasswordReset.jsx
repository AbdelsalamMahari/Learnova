import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../layout/footer/Footer";
import Navbar from "../../layout/navbar/Navbar";
import Logo from "../../assets/images/LearnovaColoredLogo2.png";

const PasswordReset = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const { id, token } = useParams();
    const url = `http://localhost:5000/forget-pass/${id}/${token}`;

    useEffect(() => {
        const verifyUrl = async () => {
            try {
                await axios.get(url);
                setValidUrl(true);
            } catch (error) {
                setValidUrl(false);
            }
        };
        verifyUrl();
    }, [id, token, url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(url, { password });
            setMsg(data.message);
            setError("");
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                setMsg("");
            }
        }
    };

    return (
        <>
      <Navbar imgSrc={Logo} className={"bg-white relative"} />
        <div className="my-20 mx-10 flex justify-center items-center">
            {validUrl ? (
                <form onSubmit={handleSubmit} className="">
                    <h1 className="mb-5 font-bold">Add New Password</h1>
                    <div>
                        <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        className="input-field bg-white px-8 py-4 md:w-96"
                    />
                    {error && <div >{error}</div>}
                    {msg && <div >{msg}</div>}
                    </div>

                    <button type="submit" className="bg-orange rounded-full text-white font-bold py-2 px-4 mt-5">
                        Submit
                    </button>
                </form>
            ) : (
                <h1 className="font-bold xl:text-2xl text-red-600">Invalid Link</h1>
            )}
        </div>
        <footer>
        <Footer />
      </footer>
        </>
    );
};

export default PasswordReset;
