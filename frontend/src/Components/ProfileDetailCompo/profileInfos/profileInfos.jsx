import React, { useState } from 'react'
import Img from './photographer.jpg'
import { FaRegStar } from "react-icons/fa6";
import './profileInfos.css';
import AverageRating from './averageRating'
import { Button, Box, Modal } from '@mui/material';
import Comments from './Comments/Comment'
import CommenterEtNoter from '../commentRatingPopups/Commentrating'


/**lzm tjib le nom et le texte de description et le role du prestataire + le id de prestataire pour le entrer comme un parameter au Averagerating component */
 /** AverageRating component lzm da5alalha paramétre li howa le prestataire id */
function ProfileInfos() {

  const [openDevis , setOpenDevis] = useState(false)
 

  const handleOpenDevis = () => setOpenDevis(true);
  const handleCloseDevis = () => setOpenDevis(false);

  
  return (
    <div className='profileContainer'>
      <div className='imgContainer'>
        <img src={Img} />
      </div>

      <div className='profileInfoContainer'>
        <h2 >Prestataire name</h2>
        <p className='description'>Passionné par l'art de capturer l'instant, je suis photographe spécialisé dans [portrait/paysage/mariages/événements, etc.]. Avec une approche créative et attentive aux détails, je transforme des moments éphémères en souvenirs intemporels. Mon objectif est de raconter des histoires uniques à travers chaque cliché, tout en offrant une expérience chaleureuse et professionnelle. Basé à Skikda, je suis disponible pour des projets locaux et internationaux. Travaillons ensemble pour immortaliser vos moments précieux !</p>
        <div className='theRole'>
          <h3 style={{fontSize:"12px" , color:"#F0E5CF"}}>Photographer</h3>
        </div>
        <button className='devisButton' onClick={handleOpenDevis}><b>DEMANDER UN DEVIS</b></button>
        <CommenterEtNoter/>

        <div style={{display:"flex" , justifyContent:"space-around"}}>
          <AverageRating />
        </div>

        <Modal
                open={openDevis} // Controls the visibility
                onClose={handleCloseDevis} // Close the modal when clicked outside
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
              <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center the modal
            width: '60%', 
            height: "500px",
            backgroundColor: '#F0E5CF',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: 24, // Gives it a shadow for a modal look
          }}>

          <h2 style={{textAlign:"center" , marginTop:"30px" , color:"#D08F70"}}>DEMANDER UN DEVIS</h2>

          <div style={{display:"flex", flexDirection:"column" , textAlign:"center" , marginTop:"6%" }}>
            <p className='emailEnter' >Entrer votre Email <span style={{color:"red"}}>*</span></p>
            <div>
              <input type="email" name="email" placeholder="Entrer votre Email" style={{width:"70%" , height:"45px" , marginBottom:"10px" , marginTop:"10px" , borderRadius:"10px" , borderStyle:"none"}}/>
            </div>
            <div>
              <input type='text' name="texte de demande" placeholder='what do you want to ask ...' style={{width:"70%" , height:"200px" , borderRadius:"10px" , borderStyle:"none" }}/>
            </div>
            <button className='envoyerButton' variant="outlined">Envoyer</button>
          </div>

          

            </Box>
                
        </Modal>
        
        


      </div>

    </div>
  )
}

export default ProfileInfos
