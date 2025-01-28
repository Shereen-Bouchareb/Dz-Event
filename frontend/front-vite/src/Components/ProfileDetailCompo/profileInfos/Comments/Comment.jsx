import  { useState, useEffect } from 'react';
import ProfilePicture from './photographer.jpg';
import CommentCards from './Commentcards';



function Comments() {
    const [Comment, setComment] = useState([
        {
            _id: "1",
            date: "2024-12-18T10:00:00Z",
            comment: "Great service and amazing photography skills!",
            clientname : "Alaa Errahmane",
            profilePic : ProfilePicture
           
        },
        {
            _id: "2",
            date: "2024-12-18T10:00:00Z",
            comment: "Great service and amazing photography skills!",
            clientname : "Alaa Errahmane",
            profilePic : ProfilePicture
            
        },
        {
            _id: "3",
            date: "2024-12-18T10:00:00Z",
            comment: "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
            clientname : "Alaa Errahmane",
            profilePic : ProfilePicture
            
        },
        {
            _id: "3",
            date: "2024-12-18T10:00:00Z",
            comment: "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
            clientname : "Alaa Errahmane",
            profilePic : ProfilePicture
            
        },
        {
            _id: "3",
            date: "2024-12-18T10:00:00Z",
            comment: "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
            clientname : "Alaa Errahmane",
            profilePic : ProfilePicture
            
        },
        {
            _id: "3",
            date: "2024-12-18T10:00:00Z",
            comment: "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
            clientname : "Alaa Errahmane",
            profilePic : ProfilePicture
            
        }
    ]);
useEffect(()=> {
    const fetchProduct = async () => {
        try {
            const response = await fetch("https://dz-event-1-rsgd.onrender.com/prestataires/1/comments"); ///endpoint here
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData.comments)
                setComment(responseData.comments);
            }else{
                console.error("la réponse du serveur ne contient pas les données attendues .")
            }
        }catch (error) {
            console.error("Erreur lors du fetch des produits best seller" , error);
        }
    };

  
    fetchProduct();
  },[Comment]) 
  return (
          <div style={{minHeight:"800px" , marginTop:"50px"}}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                   {Comment.map((CommentInfo, index) => {
                        return (
                        <div key={index} style={{marginLeft:"5%" , marginTop:"2%"}} >
                           <CommentCards 
                           id={CommentInfo._id}
                            commentdate={CommentInfo.date}
                            comment={CommentInfo.comment}
                            clientName={CommentInfo.clientname}
                            profilePic={CommentInfo.profilePic}
                          />
                        </div> 
                        );})
                    }
    
                </div>
            </div>
  )
}

export default Comments;