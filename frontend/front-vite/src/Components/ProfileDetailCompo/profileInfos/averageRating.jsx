import React, { useEffect, useState } from 'react'
import { Rating } from '@mui/material';  // Import MUI Rating component
import { TbRubberStampOff } from 'react-icons/tb';


function AverageRating({prestataire_id}) { //first you have to enter the service id 

    const [loading , setLoading] = useState(false)

    //fetch the average rating when the component mounts 

    /* useEffect(() => {
        const fetchAveragerating = async() =>{
        try{
            const response = await fetch(`https://your-backend-api.com/service/${prestataire_id}/average-rating`);
            const data = await response.json();

            if(response.ok){
                setAverageRating(data.averageRating)
            }else{
                console.error('Failed to fetch average rating');
            }
        }catch (error){
            console.error('error fetching rating' , error);
        }finally{
            setLoading(false) //stop loading once the data is fetched
        }
    };
    fetchAveragerating();
 }, [prestataire_id]);//dependency arry ensures it runs when the presatatire_Id changes  */
 const Average = Math.floor(Math.random() * 5)
  return (
    <div style={{marginTop:"10px"}} >
       <div style={{display:"flex" , justifyContent:"space-between" , width:"330px"}}>
           <p style={{fontSize:"16px" , color:"#D08E70" , marginTop:"3.5px"}}><b>service’s rate is : {Average}</b></p>
            {loading ? (<p>Loading ...</p>) : (
           <Rating 
               name= "service-rating"
               value={Average}
               readOnly //user cant change the rating here 
               max={5} // max number of stars 
               size='large' />

             )}
       </div>
    </div>
  );
}

export default AverageRating
