import React from 'react';

export default function NosServicEtTarifCards({ ServiceName, ServicePrice, ServiceDescription }) {
  return (
    <div>
      <div style={{ width: '912px', height: '250px', borderRadius: '20px', border: '3px solid #D08E70', display: 'block' , marginTop:"15px" }}>
        <div style={{ marginTop: '30px' }}>
          <p style={{ color: '#D08E70', fontSize: '24px' }}><b>{ServiceName}</b></p>
        </div>
        <div style={{ marginTop: '30px' }}>
          <p style={{ fontSize: '20px', color: 'black' }}>{ServiceDescription}</p>
        </div>
        <div style={{ marginTop: '30px' }}>
          <p style={{ color: '#A6725A' }}>Starting at: {ServicePrice}</p>
        </div>
      </div>
    </div>
  );
}

