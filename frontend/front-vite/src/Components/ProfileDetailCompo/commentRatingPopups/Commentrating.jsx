import React, { useState } from 'react'
import AverageRating from '../profileInfos/averageRating'
import { Button, Box, Modal } from '@mui/material';
import { Rating } from '@mui/material';  

function Commentrating() {

 const [value, setValue] = useState(0); // state to hold the rating value
 const [TheComment , setComment] = useState("");
    
      // This function is called when the user selects a rating
 const handleRatingChange = (event, newValue) => {
        setValue(newValue);  // Update the state with the new rating
 };

const handleCommentChange = (event) =>{
    setComment(event.target.value);
}

  const [openComment , setOpenComment] = useState(false)

  const handleOpenComment = () => setOpenComment(true);
  const handleCloseComment = () => setOpenComment(false)

  const handleSubmit = async() => {
    if (TheComment.trim() === "" || value === 0) {
        alert("Please fill in all fields.");
        return;
      }

    const loadInformations = {
        comment : TheComment,
        rating : value
    };

    try {
        const response = await fetch("https://your-backend-api-endpoint/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loadInformations),
        });
  
        if (response.ok) {
          alert("Your comment and rating have been submitted!");
          setComment("");
          setValue(0);
          handleCloseComment();
        } else {
          alert("Failed to submit. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting the data:", error);
        alert("Something went wrong. Please try again.");
      }
    };

  




  return (
    <div>
      <button className='commentButton' onClick={handleOpenComment}><b>COMMENTER ET NOTER</b></button>
      <Modal
                open={openComment} // Controls the visibility
                onClose={handleCloseComment} // Close the modal when clicked outside
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
              <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center the modal
            width: '40%', 
            height: "400px",
            backgroundColor: '#F0E5CF',
            borderRadius: '10px',
            padding: '10px',
            boxShadow: 24, // Gives it a shadow for a modal look
          }}>

          <h3 style={{textAlign:"center" , marginTop:"30px" , color:"#D08F70"}}>LAISSER NOUS UN COMMENTAIRE</h3>

          <div style={{display:"flex", flexDirection:"column" , textAlign:"center" , marginTop:"6%" }}>
            <div>
              <input type='text' name="texte de demande" value={TheComment} onChange={handleCommentChange} placeholder='What is your opinion about our services based on your experience with us ...' style={{width:"85%" , height:"80px" , borderRadius:"10px" , borderStyle:"none" }}/>
            </div>
            <div style={{marginTop:"25px"}}>
            <div>
      <h4 style={{color:"#D08F70"}}>combien vous notez notre service :</h4>
      <Rating
        name="service-rating"  // The name for the rating input
        value={value}  // The value to display
        onChange={handleRatingChange}  // Handle rating changes
        max={5}  // Maximum number of stars (default is 5)
        size="large"  // You can change the size of the stars
      />
      <p style={{fontSize:"12px" , color:"#9F9F9F"}}>Your Rating: {value} stars</p>  {/* Display the selected rating */}
    </div>
            </div>
            <button className='envoyerButton' variant="outlined" onClick={handleSubmit}>Envoyer</button>
          </div>

          

            </Box>
                
        </Modal>
    </div>
  )
}

export default Commentrating
//we need the endpoint to the API that reseve the comment and the rating of the user then stor it