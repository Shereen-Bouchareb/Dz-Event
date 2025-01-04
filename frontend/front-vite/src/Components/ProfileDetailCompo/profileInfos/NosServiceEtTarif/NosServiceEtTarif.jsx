import React, { useEffect, useState } from 'react';
import NosServicEtTarifCards from './NosServicEtTarifCards';

export default function Services() {
  const [services, setServices] = useState([{
    name: "Professional Headshots",
    price: "$500",
    description: "Professional headshots, personal branding, and individual portrait sessions tailored to capture your unique personality."
  },
  {
    name: "Wedding Photography",
    price: "$2000",
    description: "Beautiful and timeless wedding photography services."
  },]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('https://your-backend-api.com/services') // Replace with your backend endpoint
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error fetching services:', error));
  }, []);

  return (
    <div style={{marginTop:"60px"}}>
      {services.length > 0 ? (
        services.map((service, index) => (
          <NosServicEtTarifCards
            key={index}
            ServiceName={service.name}
            ServicePrice={service.price}
            ServiceDescription={service.description}
          />
        ))
      ) : (
        <p>Loading services...</p>
      )}
    </div>
  );
}

