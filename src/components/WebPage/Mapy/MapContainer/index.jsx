import { useEffect, useRef, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import Marker from './Marker';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ThemeContext } from '../../../../App';

const Mapbox = ({ lowiska, okregiList }) => {
  const mapContainerRef = useRef();
  const [map, setMap] = useState(null);
  const [visibleLowiska, setVisibleLowiska] = useState([]);
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mode === 'dark' ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/streets-v11',
      center: [19.944, 50.064],
      zoom: 9
    });

    mapInstance.on('load', () => {
      setMap(mapInstance);
    });

    return () => mapInstance.remove();
  }, [mode]); // Re-initialize map on mode change to swap styles smoothly

  useEffect(() => {
    if (!map) return;
    
    const updateVisibleMarkers = () => {
      const bounds = map.getBounds();
      const filtered = lowiska.filter((lowisko) => {
        const lng = parseFloat(lowisko.lng);
        const lat = parseFloat(lowisko.lat);
        if (isNaN(lng) || isNaN(lat)) return false;
        return bounds.contains([lng, lat]);
      });
      setVisibleLowiska(filtered);
    };

    map.on('moveend', updateVisibleMarkers);
    map.on('zoomend', updateVisibleMarkers);
    
    updateVisibleMarkers();

    return () => {
      map.off('moveend', updateVisibleMarkers);
      map.off('zoomend', updateVisibleMarkers);
    };
  }, [map, lowiska]);

  useEffect(() => {
    if (!map) return;
    
    if (!("geolocation" in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      map.setCenter([longitude, latitude]);
    }, error => {
      console.error("Błąd geolokalizacji:", error);
    });
  }, [map]);

  return (
    <div
      style={{ height: '100%', width: '100%' }}
      ref={mapContainerRef}
      className="map-container"
    >
      {map && visibleLowiska.map((lowisko) => (
        <Marker 
          key={lowisko._id || lowisko.id} 
          map={map} 
          lowisko={lowisko} 
          okregiList={okregiList}
        />
      ))}
    </div>
  );
};

export default Mapbox;
