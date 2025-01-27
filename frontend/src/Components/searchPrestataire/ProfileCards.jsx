import React from 'react'
import { FaStar } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import Img from './photographer.jpg';
import { Link } from 'react-router-dom';

export default function ProfileCards({id , role , bio , profilePic , wilaya , commune , prestName , rating}) {
  return (
    <div>
    <Link to='/DetailedProfile'>
      <div style={{display:"block" , width:"279px" , height:"470px" , backgroundColor:"#F0E5CF" , borderRadius:"10px" , cursor:"pointer" }}>
        <div>
          <img src={profilePic} style={{width:"280px" , height:"273px",objectFit:"cover" }}/>
        </div>
        <div style={{display:"block" , padding:"10px 10px"}}>
        <div style={{display:"flex"}}>
            <p style={{color:"#75574A" , fontSize:"18px"}}><b>{prestName}</b></p>
            <div style={{display:"flex" , marginLeft:"90px"}}>
               <span className='icon'><FaStar style={{color:"#FDD836" , width:"22px" , height:"22px" , marginTop:"8px"}}/></span>
               <p style={{color:"#A6725A" , fontSize:"16px" , marginTop:"10px"}}><b>{rating}</b></p>
            </div>
        </div>
        <p style={{color:"#9F9F9F" , fontSize:"12px" , marginTop:"10px" , width:"260px"}}><b>{bio}</b></p>
        <div style={{backgroundColor:"#D08E70" , width:"113px" , height:"31px", color:"#FCFCFC" , display:"flex" , justifyContent:"center" , alignItems:"center" , borderRadius:"10px" , marginTop:"20px" , fontSize:"14px"}}><b>{role}</b></div>
        <div style={{display:"flex" , marginTop:"10px"}}>
            <span><MdPlace style={{color:"#D08E70" , width:"20px" , height:"20px"}}/></span>
            <p style={{fontSize:"13px" , color:"#A6725A" , marginLeft:"10px" , marginTop:"3px"}}><b>{wilaya} /</b></p>
            <p style={{fontSize:"13px" , color:"#A6725A" , marginLeft:"10px" , marginTop:"3px"}}><b>{commune}</b></p>
        </div>
        </div>
      </div>
      </Link>
    </div>
  )
}
