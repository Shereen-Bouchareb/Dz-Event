import React from 'react'
import './YourRole.css'
import Img3 from './calen.jpeg'
import Img2 from "./img2.jpeg"
import Img1 from "./img3.jpeg"
import program_icon_1 from './program-icon-1.png'
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaUsersViewfinder } from "react-icons/fa6";

function YourRole() {
  return (
    <div className='programs container'>
      <div className='program'>
        <img src={Img1} alt=''/>
        <div className='caption'>
            <img src={program_icon_1} alt=''/>
            <p>Showcase Provider Work</p>
        </div>
      </div>
      <div className='program'>
        <img src={Img2} alt=''/>
        <div className='caption'>
            <FaUsersViewfinder style={{width:"50px" , height:"50px" , marginBottom:"10px"}} />
            <p>Find Service Providers</p>
        </div>
      </div>
      <div className='program'>
        <img src={Img3} alt=''/>
        <div className='caption'>
            <IoCalendarNumberSharp style={{width:"40px" , height:"40px" , marginBottom:"10px"}} />
            <p style={{fontSize:"18px"}}>Secure Event Booking</p>
        </div>
      </div>
    </div>
  )
}

export default YourRole