import './mapy.css';
import Navbar from '../NavBar/navbar'; 

const Mapy = () => {
  return (
    <div className="web-page-container">
      <Navbar />
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