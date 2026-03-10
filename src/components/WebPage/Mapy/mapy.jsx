import React from 'react';
import Navbar from '../NavBar/navbar';
import './mapy.css';


import mapaprzyklad from './mapaprzyklad.png'; 

const Mapa = () => {
  return (
    <>
      <Navbar />
      {/* problem */}
      <div className="mapa-page-container">
        <h2 className="mapa-title">Interaktywna Mapa Łowisk Wujka Kamila</h2>
        
        <div className="mapa-wrapper">
          <img src={mapaprzyklad} className="mapa-image" />
          {/* Pinezki zostawiamy bez zmian, będą się wyświetlać na Twoim zdjęciu */}
          <div className="pin" style={{ top: '30%', left: '45%' }}>
            <span className="pin-icon">🎣</span>
            <div className="pin-tooltip">Zalew Zegrzyński</div>
          </div>

          <div className="pin" style={{ top: '60%', left: '70%' }}>
            <span className="pin-icon">🎣</span>
            <div className="pin-tooltip">Wisła - Odcinek 402</div>
          </div>
        </div>

        <div className="mapa-legend">
          <p>💡 Kliknij w pinezkę na mapie, aby zobaczyć szczegóły łowiska.</p>
        </div>
      </div>
    </>
  );
};

export default Mapa;