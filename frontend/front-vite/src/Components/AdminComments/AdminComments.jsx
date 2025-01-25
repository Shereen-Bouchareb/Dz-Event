import React from 'react'
import Logo from './logo.png'
import { CgProfile } from "react-icons/cg";

function AdminComments() {
  return (
    <div>
      <div style={{display:"flex" , width:"100%"}}>
        <div className='navigateBar' style={{width:"18%" , height:"100vh" , backgroundColor:"#F0E5CF" , display:"block" , textAlign:"center"}}>
            <img src={Logo} style={{width:"250px" , height:"90px" , marginTop:"10px"}}/>
            <div style={{marginTop:"40px"}}>
            <div style={{display:"flex" , width:"100%" , height:"60px"  , alignItems:"center" , padding:"0 30px 0 " , gap:"24px"}}>
                <span><CgProfile style={{width:"25px" , height:"25px" , color:"#A6725A"}}/></span>
                <a href='#' style={{textDecoration:"none" , fontSize:"14px" , color:"#A6725A"}}><b>Profile</b></a>
            </div>
            <div style={{display:"flex" , width:"100%" , height:"60px"  , alignItems:"center" , padding:"0 30px 0 " , gap:"24px"}}>
                <span><CgProfile style={{width:"25px" , height:"25px" , color:"#A6725A"}}/></span>
                <a href='#' style={{textDecoration:"none" , fontSize:"14px" , color:"#A6725A"}}><b>Votre disponibilité</b></a>
            </div>
            <div style={{display:"flex" , width:"100%" , height:"60px"  , alignItems:"center" , padding:"0 30px 0 " , gap:"24px"}}>
                <span><CgProfile style={{width:"25px" , height:"25px" , color:"#A6725A"}}/></span>
                <a href='#' style={{textDecoration:"none" , fontSize:"14px" , color:"#A6725A"}}><b>Demande de reservation</b></a>
            </div>
            <div style={{display:"flex" , width:"100%" , height:"60px"  , alignItems:"center" , padding:"0 30px 0 " , gap:"24px"}}>
                <span><CgProfile style={{width:"25px" , height:"25px" , color:"#A6725A"}}/></span>
                <a href='#' style={{textDecoration:"none" , fontSize:"14px" , color:"#A6725A"}}><b>Les Avis</b></a>
            </div>
            <div style={{display:"flex" , width:"100%" , height:"60px"  , alignItems:"center" , padding:"0 30px 0 " , gap:"24px"}}>
                <span><CgProfile style={{width:"25px" , height:"25px" , color:"#A6725A"}}/></span>
                <a href='#' style={{textDecoration:"none" , fontSize:"14px" , color:"#A6725A"}}><b>Vos Services</b></a>
            </div>
            <div style={{display:"flex" , width:"100%" , height:"60px"  , alignItems:"center" , padding:"0 30px 0 " , gap:"24px"}}>
                <span><CgProfile style={{width:"25px" , height:"25px" , color:"#A6725A"}}/></span>
                <a href='#' style={{textDecoration:"none" , fontSize:"14px" , color:"#A6725A"}}><b>Votre checklist</b></a>
            </div>
            </div>
            
        </div>
        <div className='TheContent'></div>
      </div>
    </div>
  )
}

export default AdminComments
