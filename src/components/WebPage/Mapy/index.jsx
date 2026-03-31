import Navbar from '../NavBar';
import './mapy.css';
import { useEffect, useState } from 'react';

// Sub-components
import Mapbox from './MapContainer';
import LowiskoCard from '../LowiskoCard';
import LowiskoCardSkeleton from './LowiskoCardSkeleton';
import MapSkeleton from './MapSkeleton';
import SearchField from './SearchField';

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
        return miasto.toLowerCase().includes(searchQuery.toLowerCase());
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
        if (stored) {
          setOkregi(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Error parsing okregi", e);
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
            return miasto.toLowerCase().includes(query.toLowerCase());
          });
          setLowiska(filtered);
          setIsLoading(false);
          return true;
        }
      } catch (e) {
        console.error("Error parsing lowiska", e);
      }
      return false;
    };

    const stored = localStorage.getItem('lowiska');
    if (!loadData(stored)) {
      const interval = setInterval(() => {
        const data = localStorage.getItem('lowiska');
        if (loadData(data)) {
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="bg-surface font-body text-on-surface flex flex-col min-h-screen h-screen overflow-hidden transition-colors duration-300">
      <Navbar />

      <main className="flex-grow flex flex-col md:flex-row h-full overflow-hidden">
        {/* Side Panel */}
        <aside className="w-full md:w-96 lg:w-[420px] bg-surface-container-low border-0 border-r border-solid border-outline-variant flex flex-col z-20 shadow-xl md:shadow-none">
          <div className="p-8 border-0 border-b border-solid border-outline-variant bg-surface dark:bg-slate-900 transition-colors">
            <h1 className="text-3xl font-black text-primary dark:text-sky-400 tracking-tighter mb-6 m-0 uppercase">Mapa Łowisk</h1>
            <div className="space-y-4">
              <SearchField 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                onSearch={searchLowiska} 
              />
              <button 
                onClick={searchLowiska}
                className="w-full bg-primary text-white py-4 rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all border-none cursor-pointer shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">search</span>
                Szukaj
              </button>
            </div>
          </div>
          
          {/* Scrollable List */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar dark:bg-slate-900/50">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <LowiskoCardSkeleton key={i} />
              ))
            ) : lowiska?.length > 0 ? (
              lowiska.map((lowisko) => (
                <div key={lowisko._id} className="lowisko-list-item">
                  <LowiskoCard lowisko={lowisko} okregiList={okregi} isMapView={true} />
                </div>
              ))
            ) : (
              <div className="text-center py-20 opacity-40">
                <span className="material-symbols-outlined text-6xl mb-4">location_off</span>
                <p className="text-sm font-black uppercase tracking-widest">Brak łowisk</p>
                <p className="text-xs font-medium">Zmień filtry lub szukaj innego miasta.</p>
              </div>
            )}
          </div>
        </aside>

        {/* Map Area */}
        <section className="flex-grow relative bg-surface-container-highest overflow-hidden h-full">
          {isLoading ? (
            <MapSkeleton />
          ) : (
            <div className="w-full h-full">
              <Mapbox lowiska={lowiska} okregiList={okregi} />
              
              {/* Controls */}
              <div className="absolute top-8 right-8 flex flex-col gap-4 z-10">
                <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-solid border-outline-variant bg-white dark:bg-slate-900">
                  <button className="w-14 h-14 bg-transparent text-primary dark:text-sky-400 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-none cursor-pointer">
                    <span className="material-symbols-outlined text-2xl">add</span>
                  </button>
                  <div className="h-px bg-outline-variant opacity-20 mx-3" />
                  <button className="w-14 h-14 bg-transparent text-primary dark:text-sky-400 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-none cursor-pointer">
                    <span className="material-symbols-outlined text-2xl">remove</span>
                  </button>
                </div>
                
                <button className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-solid border-outline-variant flex items-center justify-center text-primary dark:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border-none">
                  <span className="material-symbols-outlined text-2xl">my_location</span>
                </button>
              </div>

              {/* Legend Overlay */}
              <div className="absolute bottom-8 right-8 z-10">
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-solid border-outline-variant dark:border-slate-800 max-w-xs transition-colors">
                  <h4 className="text-xs font-black text-primary dark:text-sky-400 mb-4 m-0 uppercase tracking-widest">Legenda Mapy</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-tighter text-on-surface dark:text-slate-300">
                      <span className="w-4 h-4 rounded-lg bg-primary shadow-sm" />
                      Łowiska PZW
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-tighter text-on-surface dark:text-slate-300">
                      <span className="w-4 h-4 rounded-lg bg-secondary shadow-sm" />
                      Komercyjne
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-tighter text-on-surface dark:text-slate-300">
                      <span className="w-4 h-4 rounded-lg bg-error shadow-sm" />
                      Obręby zakazu
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Mapa;
