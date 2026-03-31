import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { createPortal } from 'react-dom';
import { useAuth } from '../../../../../context/AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LowiskoCard from '../../LowiskoCard';

const Marker = ({ map, lowisko, okregiList }) => {
  const { user } = useAuth();
  const markerRef = useRef();
  const contentRef = useRef(document.createElement('div'));
  const popupRef = useRef(document.createElement('div'));

  const isFavorite = user?.ulubioneLowiska?.includes(lowisko._id);

  useEffect(() => {
    if (!map) return;

    const [lat, lng] = [parseFloat(lowisko.lat), parseFloat(lowisko.lng)];
    
    if (isNaN(lat) || isNaN(lng)) {
      console.warn("Invalid coordinates for lowisko:", lowisko.nazwa);
      return;
    }

    const popup = new mapboxgl.Popup({ offset: 25, maxWidth: '300px', style:{backgroundColor:"transparent"} })
      .setDOMContent(popupRef.current);

    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map);

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
    };
  }, [map, lowisko.lat, lowisko.lng]);

  return (
    <>
      {createPortal(
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            padding: "4px 12px",
            borderRadius: "20px",
            backgroundColor: isFavorite ? "#ffebee" : "#fff",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.3)",
            fontFamily: "'Segoe UI', Roboto, sans-serif",
            fontSize: "13px",
            fontWeight: "bold",
            color: isFavorite ? "#d32f2f" : "#2e7d32",
            textAlign: "center",
            cursor: "pointer",
            whiteSpace: "nowrap",
            border: isFavorite ? "2px solid #d32f2f" : "2px solid #2e7d32",
            transition: "all 0.3s ease"
          }}
        >
          {isFavorite && <FavoriteIcon sx={{ fontSize: 16 }} />}
          {lowisko.nazwa}
        </div>,
        contentRef.current
      )}
      {createPortal(
        <div style={{ width: '280px', backgroundColor: 'transparent' }}>
          <LowiskoCard lowisko={lowisko} okregiList={okregiList} />
        </div>,
        popupRef.current
      )}
    </>
  );
};

export default Marker;