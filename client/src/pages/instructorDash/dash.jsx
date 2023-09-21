import React from 'react';
import "./assets/css/style.css"
import Sidebar from '../../components/sidebars/InstructorSideBar';
import Icons from '../../assets/icons/icons';
import Logo from '../../assets/images/LearnovaColoredLogo2.png'

export default function Dash() {
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
                        <div className="numbers">$7,842</div>
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
