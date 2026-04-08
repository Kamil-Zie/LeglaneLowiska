import MobileNav from "../../NavBar/mobile";
import LowiskoCard from "../../LowiskoCard";
import LowiskoCardSkeleton from "../LowiskoCardSkeleton";
import MapSkeleton from "../MapSkeleton";
import Mapbox from "../MapContainer";
import { ThemeContext } from '../../../../App';
import { useAuth } from '../../../../context/AuthContext';
import { useContext, useState } from 'react';
const MapyMobile = ({okregi, lowiska, isLoading,searchLowiska, searchQuery, setSearchQuery}) => {
    const { logout } = useAuth();
    const { mode, toggleColorMode } = useContext(ThemeContext);
    const [viewMode, setViewMode] = useState('map');
    return (
        <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 shadow-sm">
          <div className="flex justify-between items-center px-4 h-16 max-w-2xl mx-auto">
            <div className="flex items-center gap-2"><img src="logo.svg" alt="Logo" className="w-8 h-8" /><h1 className="text-xl font-black text-sky-800 dark:text-sky-300 m-0">LegalneŁowiska</h1></div>
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleColorMode}
                className="material-symbols-outlined p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 rounded-full border-none bg-transparent cursor-pointer"
              >
                {mode === 'dark' ? 'light_mode' : 'dark_mode'}
              </button>
              <button 
                onClick={logout}
                className="material-symbols-outlined p-2 text-error hover:bg-error/10 transition-colors duration-200 rounded-full border-none bg-transparent cursor-pointer"
              >
                logout
              </button>
              <button onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')} className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 flex items-center justify-center border-none">
                <span className="material-symbols-outlined">{viewMode === 'map' ? 'list' : 'map'}</span>
              </button>
            </div>
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
        </>
    )
}

export default MapyMobile;