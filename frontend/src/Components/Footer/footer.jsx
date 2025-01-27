import React from 'react'
import Logo from './logo.png'

function footer() {
  return (
    <div>
       <div  style={{width:"100%" , height:"500px" , backgroundColor:"#F0E5CF"}}>
           <div style={{ display:"grid" , placeItems:"center"}}>
              <img src={Logo} style={{marginTop:"2%" , height:"150px" , width:"500px"}}/>
           </div>
           <p style={{color:"#754A00" , textAlign:"center"}}><b>Organiser vos événements avec les meilleurs prestataires en un clic !</b></p>
           <div style={{backgroundColor:"#75574A" , height:"2px" , width:"80%", marginLeft:"10%" , marginTop:"15%"}}></div>
           <p style={{color:"#754A00" , textAlign:"center" , marginTop:"1%"}}><b>2024 DZ EVENT . All rights reverved</b></p>
       </div>
    </div>
  )
}

export default footer
