import React from 'react';
import { Link } from 'react-router-dom';
import './mapy.css';

const Mapy = () => {
  return (
    <div className="web-page-container">
      {/* TWOJA NAWIGACJA - IDENTYCZNA JAK NA GŁÓWNEJ */}
      <nav className="navbar">
        <img src="logo.svg" alt="Logo" style={{ width: '60px', marginBottom: '15px' }} />
        <ul className="nav-links">
          <li>
                      <Link to="/mapy" style={{ color: 'inherit', textDecoration: 'none' }}>
                       Mapa
                      </Link>
                      </li>
          
                      <li>
                      <Link to="/mojelowiska" style={{ color: 'inherit', textDecoration: 'none' }}>
                       Moje łowiska
                      </Link>
                      </li>
          
                      <li>
                      <Link to="/profil" style={{ color: 'inherit', textDecoration: 'none' }}>
                       Profil
                      </Link>
                      </li>

                      <li>
                      <Link to="/Webpage" style={{ color: 'inherit', textDecoration: 'none' }}>
                       Strona Główna
                      </Link>
                      </li>
        </ul>
      </nav>

      {/* UKŁAD MAPY - ZACZYNA SIĘ POD PASKIEM */}
      <div className="map-layout">
        <aside className="map-sidebar">
          <div className="sidebar-header">
            <h3>Znajdź łowisko</h3>
            <div className="search-box-mini">
               <input type="text" placeholder="Szukaj..." />
               <button>🔍</button>
            </div>
          </div>
          <div className="results-list">
            <div className="map-spot-card">
              <h4>Zalew Zegrzyński</h4>
              <p>20km od Ciebie</p>
            </div>
            {/* ... reszta kart ... */}
          </div>
        </aside>

        <main className="map-viewer">
          {/* Tu będzie Twoja mapa */}
          <div className="map-placeholder">
             <p>Interaktywna mapa wczytywanie...</p>
          </div>
          <button className="map-floating-btn">+</button>
        </main>
      </div>
    </div>
  );
};

export default Mapy;