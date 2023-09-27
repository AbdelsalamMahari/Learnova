import { useState } from "react";
import axios from "axios";
import Footer from "../../layout/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../layout/navbar/Navbar"
import Logo from "../../assets/images/LearnovaColoredLogo2.png";
import Button from "../../components/buttons/button";

const ForgetPass = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:5000/forget-pass`;
			const { data } = await axios.post(url, { email });
			toast.success(data.message, {
				theme: "colored",
			  });
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				toast.error(error.response.data.message, {
					theme: "colored",
				  });
			}
		}
	};

	return (
		<>
		<ToastContainer/>
        <Navbar imgSrc={Logo} className={"bg-white relative"} />
		<div className="my-20 mx-10">
			<form  onSubmit={handleSubmit}>
				<h1 className="mb-10">Lost your password? Please enter your email address. You will receive a link to create a new password via email.</h1>
				<label className="text-gray-500">Enter Your Email</label>
				<div>
					<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className="input-field bg-white px-8 py-4 md:w-96"
				/>
				</div>

<Button className={"mt-5"} text={"Submit"}></Button>
			</form>
		</div>
		<footer>
        <Footer />
      </footer>
		</>
	);
};

export default ForgetPass;