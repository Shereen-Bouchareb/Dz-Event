import React, { useState } from 'react';
import './detailPrest.css';
import Gallery from '../Galery/Galery';
import Reviews from '../Comments/Comment';
import Calendar from '../Calendar/Calendar';
import NosServicEtTarif from '../NosServiceEtTarif/NosServiceEtTarif';


function DetailPrest() {
  const [clickedButton, setClickedButton] = useState(1);

  const handleButtonClicked = (buttonId) => {
    setClickedButton(buttonId);
  };

  const renderContent = () => {
    switch (clickedButton) {
      case 1:
        return <Gallery />;
      case 2:
        return <Reviews />;
      case 3:
        return <NosServicEtTarif/>
      case 4: 
        return <Calendar />; 
      default:
        return <Gallery />;
    }
  };

  return (
    <div style={{ marginBottom: "50px" , textAlign:"center" }}>
    <div style={{display:"block"}}>
      <div className='ChoiseContainer' style={{ width: "80%", backgroundColor: "#F0E5CF", height: "80px", justifyContent: "space-around", alignItems: "center", display: "inline-flex" , borderRadius:"10px" }}>
        <button className={clickedButton === 1 ? 'clickedButton' : 'detail'} onClick={() => handleButtonClicked(1)}>
          <b >Galerie</b>
        </button>
        <button className={clickedButton === 2 ? 'clickedButton' : 'detail'} onClick={() => handleButtonClicked(2)}>
          <b>Avis Des Clients</b>
        </button>
        <button className={clickedButton === 3 ? 'clickedButton' : 'detail'} onClick={() => handleButtonClicked(3)}>
          <b>Nos Service Et Tarif</b>
        </button>
        <button className={clickedButton === 4 ? 'clickedButton' : 'detail'} onClick={() => handleButtonClicked(4)}>
          <b>La Disponibilité</b>
        </button>
      </div>
      <div className="content-section" style={{ marginTop: "80px", width: "100%", margin: "0 auto" , display:"grid" , placeItems:"center"}}>
        {renderContent()}
      </div>
      </div>
    </div>
  );
}

export default DetailPrest;
