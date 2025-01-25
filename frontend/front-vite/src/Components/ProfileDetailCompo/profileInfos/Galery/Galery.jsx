import React, { useState, useEffect } from 'react';
import Img from './photographer.jpg'

export default function Gallery() {
  const [images, setImages] = useState([
    { url: "https://via.placeholder.com/300x250" },
    { url: "https://via.placeholder.com/300x250?text=Image+2" },
    { url: "https://via.placeholder.com/300x250?text=Image+3" },
    { url: "https://via.placeholder.com/300x250?text=Image+4" },
    { url: "https://via.placeholder.com/300x250?text=Image+5" },
    { url: "https://via.placeholder.com/300x250?text=Image+6" },
  ]); // State to store images fetched from the database
  const [selectedImage, setSelectedImage] = useState(null); // State for lightbox

  // Fetch images from the database
 /*  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/images"); // Replace with your API endpoint
        const data = await response.json(); // Assuming the response is JSON
        if (response.ok) {
          setImages(data.images); // Set the fetched images in the state
        } else {
          console.error("Error fetching images:", data.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchImages();
  }, []); // Runs only once when the component mounts */

  // Function to close the lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div style={{minHeight: "700px", padding: "10px",display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column" }}>
     
        <div style={{display: "flex",flexWrap: "wrap",gap: "20px",justifyContent: "center",alignItems: "center"}}>
        
           {images.map((image, index) => (
             <img
                key={index}
                src={image.url} // Assuming 'url' is the property containing the image link
                alt={`Gallery Image ${index}`}
                style={{width: "20%",height: "250px",objectFit: "cover",cursor: "pointer",borderRadius: "5px"}}
                onClick={() => setSelectedImage(image.url)}/>
            ))} 
     
        </div>

      
      {selectedImage && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Shadow effect
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}
          onClick={closeLightbox} // Close when clicking on the background
        >
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "80%", maxHeight: "80%", borderRadius: "10px" }}
          />
          {/* Close Button */}
          <button style={{
            position: "absolute",
            width:"50px",
            height:"50px",
            top: "50px",
            right: "100px",
            backgroundColor: "white",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            padding: "5px 10px",
            borderRadius: "50%"
          }} onClick={closeLightbox}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
