import React, { useState, useEffect } from 'react';
import TopPage from "../../components/topPage/TopPage";
import Footer from "../../layout/footer/Footer";
import UserInfo from '../../components/users/UserInfo';
import axios from 'axios';
export default function MyCourses() {
const [EnrollementData,SetEnrollementData]=useState([]);
const user=UserInfo()
console.log(user)

useEffect(()=>{
  const FetchAllEnrollements=async()=>{
    try{
      const response=await axios.get('http://localhost:5000/get/enrollement')
      SetEnrollementData(response.data)
    
    }catch(error){
console.log(error)
    }
  }
  FetchAllEnrollements();
},[])
console.log(EnrollementData)
  return (
    <>
      <TopPage
        title="My Courses"
        backgroundImageUrl="https://wallpaperaccess.com/full/1691795.jpg"
      />
      <div>
        <div className="main-container">

        </div>
      </div>
      <Footer />
    </>
  );
}
