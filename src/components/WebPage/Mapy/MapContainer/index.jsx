import { useEffect, useRef,useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from '../../../../api/axios';

import 'mapbox-gl/dist/mapbox-gl.css';

const Mapbox = ({lowiska}) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

 
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [19.944, 50.064],
      zoom: 9
    });
  });
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
        //console.log(lowiska)
    if(lowiska.length > 0) {
        lowiska.forEach(lowisko => {
            //console.log(lowisko)
        //if(lowisko.lng && lowisko.lat) {
            const [lat, lng] = [parseFloat(lowisko.lat), parseFloat(lowisko.lng)];
            new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(lowisko.nazwa))
            .addTo(mapRef.current);
            //console.log("Mark created" , [lowisko.lat, lowisko.lng])
        //}
        });
    }
    },[lowiska]);

  return (
    
    <div
      style={{ height: '30vh', width:'60vh'}}
      ref={mapContainerRef}
      className="map-container"
    />
  );
};

export default Mapbox;