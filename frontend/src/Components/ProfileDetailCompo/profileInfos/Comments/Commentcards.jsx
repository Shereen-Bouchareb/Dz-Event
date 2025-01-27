import React from 'react'


export default function Commentcards({id ,clientName , commentdate , profilePic , comment}) {
  return (
    <div style={{display:"block" , width:"400px"}}>
      <div style={{display:"flex"}}>
        <div>
            <img src={profilePic} style={{height:"32px" , width:"32px" , borderRadius:"50%", marginRight:"18px"}}/>
        </div>
        <div style={{display:"block"}}>
            <p style={{fontSize:"16px", color:"black" }}><b>{clientName}</b></p>
            <p style={{fontSize:"12px" , color:"#9F9F9F"}}>{commentdate}</p>
        </div>
      </div>
      <div style={{marginTop:"10px"}}>
        <p style={{fontSize:"14px" , color:"#9F9F9F"}}>{comment}</p>
      </div>
    </div>
  )
}
