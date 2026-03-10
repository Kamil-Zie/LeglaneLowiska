<<<<<<< HEAD
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
=======
import Navbar from '../NavBar/navbar'; 
import mapboxgl from 'mapbox-gl';
import { useEffect, useState, useRef } from 'react';
import axios from '../../../api/axios';
import { TextField } from '@mui/material';
import { useDebounce } from '../../../hooks/useDebounce';
import '../Webpage.css';

const Mapy = () => {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [lowiska, setLowiska] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 100);
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [19.944, 50.064],
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

    useEffect(() => {
        const fetchLowiska = async () => {
        try {
          await axios.get(`/lowiska`, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }).then(response => {
            console.log("Odpowiedź z backendu:", response.data.lowiska);
            setLowiska(response.data.lowiska);
          });
          console.log("Lowiska:", lowiska);
        } catch (error) {
          console.error("Error fetching lowiska:", error);
        }
      };
      fetchLowiska();
    }, []);

    useEffect(() => {
      if(debouncedSearchQuery) {
        const fetchLowiska = async () => {
        try {
          await axios.get(`/lowiska/${searchQuery}`, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }).then(response => {
            console.log("Odpowiedź z backendu:", response.data.lowiska);
            setLowiska(response.data.lowiska);
          });
          console.log("Lowiska:", lowiska);
        } catch (error) {
          console.error("Error fetching lowiska:", error);
        }
      };
      fetchLowiska();
    }
    }, [searchQuery, debouncedSearchQuery]);

    // useEffect(() => {
    //   if(lowiska.length > 0) {
    //     lowiska.forEach(lowisko => {
    //       console.log("Lowisko:", lowisko);
    //       if(lowisko.lokalizacja) {
    //         const [lat, lng] = [parseFloat(lowisko.lokalizacja.lat), parseFloat(lowisko.lokalizacja.lng)];
    //         new mapboxgl.Marker()
    //           .setLngLat([lng, lat])
    //           .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(lowisko.nazwa))
    //           .addTo(mapRef.current);
    //       }
    //     });
    //   }
    // }, [lowiska]);

    useEffect(() => {
      new mapboxgl.Marker()
        .setLngLat([18.001819336147324, 53.123595474995994])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText("Przykładowe Łowisko"))
        .addTo(mapRef.current);
    }, []);
  return (
    <div className="web-page-container">
      <Navbar />
      <div className="map-layout">
        <aside className="map-sidebar">
          <div className="sidebar-header">
            <h3>Znajdź łowisko</h3>
            <div className="search-box-mini">
              <TextField label="Wpisz miasto" variant="outlined" size="small" fullWidth onChange={(e)=>setSearchQuery(e.target.value)}/>
               <button>🔍</button>
            </div>
          </div>
          {/* <div className="results-list" style={{overflowY: 'auto', maxHeight: '400px', display: 'flex', flexDirection: 'row', gap: '10px'}}>
            {
                lowiska?.map(lowisko => (
                  <div key={lowisko._id} className="result-item">
                    <h4>{lowisko.nazwa}</h4>
                    <p>{lowisko.opis}</p>
                    <p>Srednia Ocen: {lowisko.sredniaOcen}/5</p>
                    <p>Ilosc Ocen: {lowisko.iloscOcen}</p>
                  </div>
                ))
            }
          </div> */}
        </aside>

        <div className="map-viewer" style={{height:'50vh'}}>
          <div id='map-container' ref={mapContainerRef}></div>
>>>>>>> c5a21862b32b0d887ec4fa1f0f01d8b5765793c6
        </div>
      </div>
    </>
  );
};

export default Mapa;