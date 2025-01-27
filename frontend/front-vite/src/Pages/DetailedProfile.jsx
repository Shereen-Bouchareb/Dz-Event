import React from 'react'
import Header from '../Components/Header/Header'
import ProfileInfos from '../Components/ProfileDetailCompo/profileInfos/profileInfos';
import DetailPres from '../Components/ProfileDetailCompo/profileInfos/detailSlideBar/detailPrest';
import Footer from '../Components/Footer/footer'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function DetailedProfile() {
  const { id } = useParams();
  const [data, setData] = useState()
  console.log(id)
  useEffect(() => {
    
    const fetchProfile = async () => {
      try {

        const authToken = localStorage.getItem('token');
        if (!authToken) {
          console.error("No token found. Please log in.");
          return;
        }

        const response = await fetch(`http://localhost:3000/prestataires/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        setData(data.prestataire)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProfile();
  }, [id]);
  return (
     <div className="App">
      <Header />
      {data ? <ProfileInfos data={data} /> : <p>Loading...</p>}
      <DetailPres />
      <Footer />
    </div>
  );
}
