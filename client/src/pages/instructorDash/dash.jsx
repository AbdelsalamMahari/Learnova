import React, { useEffect, useState } from "react";
import "./assets/css/style.css"
import Axios from "axios"; // Import Axios
import Sidebar from '../../components/sidebars/InstructorSideBar';
import Icons from '../../assets/icons/icons';
import Logo from '../../assets/images/LearnovaColoredLogo2.png'
import UserInfo from "../../components/users/UserInfo";

export default function Dash() {
    const user = UserInfo();
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // Make a GET request to your backend API to get the total subscription amount
        if (user && user._id) { // Check if user is not null and has _id
            Axios.get(`http://localhost:5000/users/balance/${user._id}`)
              .then((response) => {
                setTotalAmount(response.data.balance);
              })
              .catch((error) => {
                console.error("Error fetching total subscription amount:", error);
              });
        }
    }, [user]);
    
  return (
<>
<div className="container-dash">
    <Sidebar/>
        <div className="main-dash">
            <div className="topbar">
                <div className="toggle">
                    <Icons.Bars size={24}/>
                </div>

                <div className="search">
                    <label>
                        <input type="text" placeholder="Search here"/>
                        <ion-icon name="search-outline"></ion-icon>
                    </label>
                </div>
                <div className='w-32'>
                    <img src={Logo} alt='logo'></img>
                </div>
            </div>


            <div className="cardBox">
                <div className="card">
                    <div>
                        <div className="numbers">1,504</div>
                        <div className="cardName">Daily Views</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="eye-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">80</div>
                        <div className="cardName">Sales</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="cart-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">284</div>
                        <div className="cardName">Comments</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">${totalAmount}</div>
                        <div className="cardName">Earning</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="cash-outline"></ion-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}
