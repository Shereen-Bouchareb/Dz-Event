import React from 'react'
import Logo from './logo.png'
import { Link } from 'react-router-dom';
function Header() {
  return (
    <div style={{width:"100%"}}>
      <div className='firstHeader' style={{height:"42px" , width:"100vw" ,  backgroundColor:"#D08E70" , textAlign:"center" , display:"flex" ,justifyContent:"center" , alignItems:"center"}}>
        <p style={{fontSize:"14px" , color:"#FEE8B7" ,}}><b>Simplifiez l'organisation de vos événements avec les meilleurs prestataires en un clic !</b></p>
      </div>
      <div className='secondHeader' style={{height:"65px" , width:"100vw" , backgroundColor:"#F0E5CF" , display:"flex"}}>
        <div className='logo'>
          <img src={Logo} style={{width:"200px" , height:"63px" , marginLeft:"20px"}}/>
        </div>
        <div className='headerTitle' style={{display:"flex" ,width:"25%", marginLeft:"13%" , alignItems:"center" , justifyContent:"space-between"}}>
         <Link to="/"> <a style={{color:"#A6725A"}}><b>Home</b></a></Link>
          <a style={{color:"#A6725A"}}><b>trouver prestataires</b></a>
          <a style={{color:"#A6725A"}}><b>vos réservations</b></a>
        </div>
      </div>
    </div>
  )
}

export default Header
