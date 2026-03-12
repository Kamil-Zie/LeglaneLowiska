import Navbar from '../NavBar/navbar'; 
import mapboxgl from 'mapbox-gl';
import { useEffect, useState, useRef } from 'react';
import axios from '../../../api/axios';
import { TextField } from '@mui/material';
import { useDebounce } from '../../../hooks/useDebounce';
import '../WebPage.css';

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
          <div className="results-list" style={{overflowY: 'auto', maxHeight: '400px', display: 'flex', flexDirection: 'row', gap: '10px'}}>
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
          </div>
        </aside>

        <div className="map-viewer" style={{height:'50vh'}}>
          <div id='map-container' ref={mapContainerRef}></div>
        </div>
      </div>
      </div>
  );
};

export default Mapa;