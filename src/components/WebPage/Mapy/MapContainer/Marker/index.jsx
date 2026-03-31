import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { createPortal } from 'react-dom';
import { useAuth } from '../../../../../context/AuthContext';
import LowiskoCard from '../../../LowiskoCard';

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
      return;
    }

    const popup = new mapboxgl.Popup({ 
      offset: 35, 
      maxWidth: '300px',
      className: 'custom-map-popup'
    }).setDOMContent(popupRef.current);

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
        <div className="relative flex flex-col items-center group cursor-pointer">
          {/* Tooltip on hover */}
          <div className="absolute -top-10 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-50">
            {lowisko.nazwa}
          </div>
          
          {/* The Pin */}
          <div className={`w-8 h-8 rounded-full border-2 border-solid border-white shadow-xl flex items-center justify-center transform hover:scale-110 transition-transform ${isFavorite ? 'bg-error' : 'bg-primary'}`}>
            <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isFavorite ? 'favorite' : 'water'}
            </span>
          </div>
          
          {/* Pulsing effect if favorite */}
          {isFavorite && (
            <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-error/40 animate-ping -z-10" />
          )}
        </div>,
        contentRef.current
      )}
      {createPortal(
        <div className="w-72 bg-transparent overflow-hidden rounded-xl shadow-2xl">
          <LowiskoCard lowisko={lowisko} okregiList={okregiList} />
        </div>,
        popupRef.current
      )}
    </>
  );
};

export default Marker;
