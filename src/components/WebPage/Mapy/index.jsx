import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../NavBar';
import MobileNav from '../MobileNav';
import './mapy.css';

// Sub-components
import Mapbox from './MapContainer';
import LowiskoCard from '../LowiskoCard';
import LowiskoCardSkeleton from './LowiskoCardSkeleton';
import MapSkeleton from './MapSkeleton';
import SearchField from './SearchField';

const Mapa = () => {
  const location = useLocation();
  const [lowiska, setLowiska] = useState([]);
  const [okregi, setOkregi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [viewMode, setViewMode] = useState('map');

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
      `}</style>

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-grow flex h-full overflow-hidden">
          <aside className="w-96 lg:w-[420px] bg-surface-container-low border-0 border-r border-solid border-outline-variant flex flex-col z-20 shadow-xl">
            <div className="p-8 border-0 border-b border-solid border-outline-variant bg-surface dark:bg-slate-900 transition-colors">
              <h1 className="text-3xl font-black text-primary dark:text-sky-400 tracking-tighter mb-6 m-0 uppercase">Mapa Łowisk</h1>
              <div className="space-y-4 text-left">
                <SearchField value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onSearch={searchLowiska} />
                <button onClick={searchLowiska} className="w-full bg-primary text-white py-4 rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] border-none cursor-pointer shadow-lg">Szukaj</button>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar text-left">
              {isLoading ? Array.from({ length: 4 }).map((_, i) => <LowiskoCardSkeleton key={i} />) : lowiska.map(lowisko => <LowiskoCard key={lowisko._id} lowisko={lowisko} okregiList={okregi} isMapView={true} />)}
            </div>
          </aside>
          <section className="flex-grow relative overflow-hidden h-full">
            {isLoading ? <MapSkeleton /> : <Mapbox lowiska={lowiska} okregiList={okregi} />}
          </section>
        </main>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex flex-col h-screen overflow-hidden pb-24 text-left">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 shadow-sm">
          <div className="flex justify-between items-center px-4 h-16 max-w-2xl mx-auto">
            <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sky-700">anchor</span><h1 className="text-xl font-black text-sky-800 m-0">Mapa</h1></div>
            <button onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')} className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 flex items-center justify-center border-none"><span className="material-symbols-outlined">{viewMode === 'map' ? 'list' : 'map'}</span></button>
          </div>
        </header>
        <main className="flex-grow relative pt-16 h-full overflow-hidden">
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <div className={`p-4 z-20 ${viewMode === 'map' ? 'absolute top-0 left-0 right-0' : 'relative bg-white dark:bg-slate-900'}`}><input className="w-full h-12 pl-4 pr-4 rounded-xl border-none bg-white dark:bg-slate-800 shadow-lg ring-1 ring-slate-200 focus:ring-2 focus:ring-primary text-sm" placeholder="Szukaj..." type="text" value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value); searchLowiska();}} onKeyPress={(e) => e.key === 'Enter' && searchLowiska()} /></div>
            <div className={`flex-grow relative ${viewMode === 'map' ? 'block' : 'hidden'} h-full`}>{isLoading ? <MapSkeleton /> : <Mapbox lowiska={lowiska} okregiList={okregi} />}</div>
            <div className={`flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar ${viewMode === 'list' ? 'block' : 'hidden'}`}>{isLoading ? Array.from({ length: 4 }).map((_, i) => <LowiskoCardSkeleton key={i} />) : lowiska.map(lowisko => <LowiskoCard key={lowisko._id} lowisko={lowisko} okregiList={okregi} isMapView={true} />)}</div>
          </div>
        </main>
        <MobileNav />
      </div>
    </div>
  );
};

export default Mapa;
