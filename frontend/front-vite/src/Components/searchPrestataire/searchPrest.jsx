import React , { useState , useEffect } from 'react'
import { FaAngleDown } from "react-icons/fa";
import './searchPrest.css'
import { Button, Box, Modal } from '@mui/material';
import ProfileCards from './ProfileCards'
import Img from './photographer.jpg'
import { Link } from "react-router-dom";
function SearchPrest() {

  const [openWilayaChoise , setOpenWilayaChoise] = useState(false);
  const [openRoleChoise , setOpenRoleChoise] = useState(false);
  const [choosedWilaya , setChoosedWilaya] = useState('');
  const [choosedRole , setChoosedRole] = useState('');
  const [filteredProfileCards , setFilteredProfileCards] = useState([]);
  

//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlclR5cGUiOiJjbGllbnQiLCJpYXQiOjE3Mzc5MDQ0OTgsImV4cCI6MTc0MDQ5NjQ5OH0.uHFj3jD4-YvgSrbPh6zCidGJuczZNDJjrbywWrLaP7M"; // Replace this with the actual token

// Store the token in local storage
//localStorage.setItem('authToken', token);



  const handleOpenWilayaChoise = () => setOpenWilayaChoise(true);
  const handleCloseWilayaChoise = () => setOpenWilayaChoise(false);

  const handleOpenRoleChoise = () => setOpenRoleChoise(true)
  const handleCloseRoleChoise = () => setOpenRoleChoise(false)

  const wilayas1 = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra",
    "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret",
    "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif"
    
  ];

  const wilayas2 = [ "Saïda", "Skikda" ,"Sidi Bel Abbès", "Annaba" ,"Guelma", "Constantine", "Médéa", "Mostaganem",
    "Msila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj","Boumerdès", "El Taref", "Tindouf","Tissemsilt"];

  const wilayas3 = [ "El Oued" , "Khenchela",
    "Souk Ahras", "Mila" , "Aïn Defla" ,"Naâma" , "Aïn Témouchent","Ghardaïa" , "Relizane"];

  const handleChoosedWilaya = (event) => {
    setChoosedWilaya(event.target.value)
  }

  const handleChoosedRole = (event) => {
    setChoosedRole(event.target.value)
  }

  const [Roles , setRoles] = useState(['Photographe' , 'Caterer' , 'Venue Manager' , 'DJ' , 'Florist' ,'Event Planner' , 'Videographer' , 'Makeup Artist' , 'Hair Stylist' , 'Security' , 'Waiter' , 'Decorator' , 'Lighting' , 'Technician' , 'Sound Engineer' , 'Transporter' , 'Other'])


  const useFetch = async () => {
    try {
      // Retrieve the token from local storage
      const authToken = localStorage.getItem('token');

      console.log("token",authToken)
      if (!authToken) {
        console.error("No token found. Please log in.");
        return; // Exit the function if no token is found
      }
       const response = await fetch('https://dz-event-1-rsgd.onrender.com/prestataires', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Use the retrieved token
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }   
      const data = await response.json();
      console.log("Fetched data:", data.prestataires);
    /*   setprofileCard(data); // Update state with fetched data */
    setprofileCard(data.prestataires);
    setFilteredProfileCards(data.prestataires);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally, set an error state to display a message to the user
    }
  };





  useEffect(() => {
    useFetch();
  }, []);

  const [Profilecards , setprofileCard] = useState([
   {
        id : "7",
        ProfilePic :Img , 
        PrestataireName : "Mohammed Loai",
        Bio : "your photographer is here i wanna be a part in your events lets make it like a dream",
        rating : "4,9",
        role : "Photographe",
        wilaya : "Annaba",
        commune :"ville" 
    }
]) 

useEffect(() => {
  const filteredCards = choosedWilaya
? Profilecards.filter((card) => card.wilaya === choosedWilaya)
: Profilecards;

setFilteredProfileCards(filteredCards);
}, [choosedWilaya , Profilecards]); 

const handleShowAll = () => {
  setFilteredProfileCards(Profilecards)
}


useEffect(() => {
  const filteredCards = choosedRole
? Profilecards.filter((card) => card.role === choosedRole)
: Profilecards;

setFilteredProfileCards(filteredCards);
}, [choosedRole , Profilecards]); 


  return (
    <div style={{marginTop:"70px"}}>
    <div style={{display:"grid" , placeItems:"center"}}>
      <div className='theContainer'>
        <p style={{fontSize:"16px" , color:"#FFFAE3" }}><b>Sort by :</b></p>
        <div className='choisesContainer' onClick={handleOpenWilayaChoise}>
            <p style={{color:"#D08E70" , fontSize:"16px"}}><b>Wilaya</b></p>
            <span><FaAngleDown className='iconCss' /></span>
        </div>
        <div className='choisesContainer' onClick={handleOpenRoleChoise}>
            <p style={{color:"#D08E70" , fontSize:"16px"}}><b>Role</b></p>
            <span><FaAngleDown className='iconCss' /></span>
        </div>
        <div className='choisesContainer' style={{width:"150px"}}>
            <p style={{color:"#D08E70" , fontSize:"16px"}}><b>Disponibilité</b></p>
            <span><FaAngleDown className='iconCss' /></span>
        </div>
      </div>
      { <div style={{display:"flex" , flexWrap:"wrap",gap:"40px" , justifyContent:"center" , alignItems:"center" , marginBottom:"400px" }}>
              {filteredProfileCards.map((profileInfo , index) => {
                  return(
                    
                    <div key={index} style={{}}>
                          <ProfileCards 
                          key={index}
                              id = {profileInfo.id}
                              profilePic={Img}
                              bio={profileInfo.userBio}
                              firstName={profileInfo.firstname}
                              famillyName={profileInfo.familyname}
                              rating={Math.floor(Math.random() * 5)}
                              role={profileInfo.role}
                              wilaya={profileInfo.wilaya}
                            
                          />
                      </div>
                  )
              })}
          </div>}
          </div> 
      <Modal open={openWilayaChoise} onClose={handleCloseWilayaChoise} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center the modal
            width: '40%', 
            height: "620px",
            backgroundColor: '#F0E5CF',
            borderRadius: '10px',
            padding: '10px',
            boxShadow: 24, // Gives it a shadow for a modal look
          }}>
         
         <form style={{ textAlign: "center" }}>
           <div style={{display:"flex" , alignItems:"center" , justifyContent:"center" , gap:"50px"}}>
             <div>
               {wilayas1.map((wilaya, index) => (
                 <div key={index} style={{ marginBottom: "10px" }}>
                       <input
                          type="radio"
                          id={`option-${wilaya}`}
                          name="choices"
                          value={wilaya}
                          onClick={handleChoosedWilaya}
                       />
                       <label htmlFor={`option-${wilaya}`}>{wilaya}</label>
                 </div> ))}
              </div>
              <div>
               {wilayas2.map((wilaya, index) => (
                 <div key={index} style={{ marginBottom: "10px" }}>
                       <input
                          type="radio"
                          id={`option-${wilaya}`}
                          name="choices"
                          value={wilaya}
                          onClick={handleChoosedWilaya}
                       />
                       <label htmlFor={`option-${wilaya}`}>{wilaya}</label>
                 </div> ))}
              </div>
              <div>
               {wilayas3.map((wilaya, index) => (
                 <div key={index} style={{ marginBottom: "10px" }}>
                       <input
                          type="radio"
                          id={`option-${wilaya}`}
                          name="choices"
                          value={wilaya}
                          onClick={handleChoosedWilaya}
                       />
                       <label htmlFor={`option-${wilaya}`}>{wilaya}</label>
                 </div> ))}
              </div>

            </div>
            <button style={{backgroundColor:"#D08E70" , borderStyle:"none" , color:"white" , width:"70px" , height:"30px", borderRadius:"20px" , cursor:"pointer"}} onClick={handleShowAll}>Show All</button>
          </form>

        </Box>
      </Modal>
      <Modal open={openRoleChoise} onClose={handleCloseRoleChoise} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center the modal
            width: '40%', 
            height: "200px",
            backgroundColor: '#F0E5CF',
            borderRadius: '10px',
            padding: '10px',
            boxShadow: 24, // Gives it a shadow for a modal look
          }}>
          <form style={{ display:"grid" , placeItems:"center"  }}>
           <div style={{display:"flex" , flexWrap:"wrap", alignItems:"center" , justifyContent:"center" , gap:"5px" , marginTop:"20px"}}>
            
               {Roles.map((role, index) => (
                 <div key={index} style={{ marginBottom: "10px" }}>
                       <input
                          type="radio"
                          id={`option-${role}`}
                          name="choices"
                          value={role}
                          onClick={handleChoosedRole}
                       />
                       <label htmlFor={`option-${role}`} onClick={handleChoosedRole}>{role}</label>
                 </div> ))}
            </div>
            <button style={{backgroundColor:"#D08E70" , borderStyle:"none" , color:"white" , width:"70px" , height:"30px", borderRadius:"20px" , marginTop:"15px",cursor:"pointer"}} >Show All</button>
          </form>
        </Box>
      </Modal>

      
      

    </div>
  )
}

export default SearchPrest
