import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import MojeLowiskaMobile from './mobile';
import MojeLowiskaDesktop from './desktop';

const MojeLowiska = () => {
  const { user } = useAuth();
  const [favoriteLowiska, setFavoriteLowiska] = useState([]);
  const [okregi, setOkregi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      const allLowiska = JSON.parse(localStorage.getItem('lowiska')) || [];
      const allOkregi = JSON.parse(localStorage.getItem('okregi')) || [];
      setOkregi(allOkregi);
      if (user?.ulubioneLowiska) {
        setFavoriteLowiska(allLowiska.filter(lowisko => user.ulubioneLowiska.includes(lowisko._id)));
      }
      setIsLoading(false);
    };
    fetchData();
  }, [user]);

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen transition-colors duration-300">
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
      `}</style>

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:flex flex-col min-h-screen">
        <MojeLowiskaDesktop 
        isLoading={isLoading}
        favoriteLowiska={favoriteLowiska}
        okregi={okregi}/>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex flex-col min-h-screen pb-24 text-left">
        <MojeLowiskaMobile 
        isLoading={isLoading}
        favoriteLowiska={favoriteLowiska}
        okregi={okregi}/>
      </div>
    </div>
  );
};

export default MojeLowiska;
