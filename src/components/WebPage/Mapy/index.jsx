import { useEffect, useState } from 'react';
import MapyMobile from './mobile';
import MapyDesktop from './desktop';

const Mapa = () => {
  const [lowiska, setLowiska] = useState([]);
  const [okregi, setOkregi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');

  const searchLowiska = () => {
    try {
      const all = JSON.parse(localStorage.getItem('lowiska')) || [];
      const filtered = all.filter((lowisko) => {
        const miasto = lowisko.miasto || '';
        const nazwa = lowisko.nazwa || '';
        return miasto.toLowerCase().includes(searchQuery.toLowerCase()) || 
               nazwa.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setLowiska(filtered);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const loadOkregi = () => {
      try {
        const stored = localStorage.getItem('okregi');
        if (stored) setOkregi(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    };
    loadOkregi();

    const loadData = (dataStr) => {
      try {
        if (!dataStr) return false;
        const all = JSON.parse(dataStr);
        if (Array.isArray(all) && all.length > 0) {
          const query = localStorage.getItem('searchQuery') || '';
          const filtered = all.filter((lowisko) => {
            const miasto = lowisko.miasto || '';
            const nazwa = lowisko.nazwa || '';
            return miasto.toLowerCase().includes(query.toLowerCase()) ||
                   nazwa.toLowerCase().includes(query.toLowerCase());
          });
          setLowiska(filtered);
          setIsLoading(false);
          return true;
        }
      } catch (e) {
        console.error(e);
      }
      return false;
    };

    const stored = localStorage.getItem('lowiska');
    if (!loadData(stored)) {
      const interval = setInterval(() => {
        const data = localStorage.getItem('lowiska');
        if (loadData(data)) clearInterval(interval);
      }, 300);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col transition-colors duration-300">
      <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-map-popup .mapboxgl-popup-content {
            background: transparent;
            border: none;
            box-shadow: none;
            padding: 0;
        }
        .custom-map-popup .mapboxgl-popup-tip {
            border-top-color: #fff;
        }

      `}</style>

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:flex flex-col h-screen overflow-hidden">
        <MapyDesktop  okregi={okregi} lowiska={lowiska} isLoading={isLoading} searchLowiska={searchLowiska} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex flex-col h-screen overflow-hidden pb-24 text-left">
        <MapyMobile okregi={okregi} lowiska={lowiska} isLoading={isLoading} searchLowiska={searchLowiska} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      </div>
    </div>
  );
};

export default Mapa;
