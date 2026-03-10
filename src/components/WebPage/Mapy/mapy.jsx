import './mapy.css';
import Navbar from '../NavBar/navbar'; 
import mapboxgl from 'mapbox-gl';
import { useEffect, useState, useRef } from 'react';

const Mapy = () => {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [19.944, 50.064], // Przykładowe współrzędne (Warszawa)
      zoom: 10
    });
    return () => mapRef.current.remove();
  }, [])

  useEffect(() => {
      if(!"geolocation" in navigator) {
        console.log("Brak geolokalizacji");
        return;
      }
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        mapRef.current.setCenter([longitude, latitude]);
      }, error => {
        console.error("Błąd geolokalizacji:", error);
      });
    }, []);
  return (
    <div className="web-page-container">
      {/* TWOJA NAWIGACJA - IDENTYCZNA JAK NA GŁÓWNEJ */}
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
          <div id='map-container' ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>
          <button className="map-floating-btn">+</button>
        </main>
      </div>
    </div>
  );
};

export default Mapy;