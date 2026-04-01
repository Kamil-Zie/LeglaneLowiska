import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar';
import { useAuth } from '../../../context/AuthContext';
import LowiskoCard from '../LowiskoCard';
import MobileNav from '../MobileNav';
import { Link } from 'react-router-dom';

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
        <Navbar />
        <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 py-12 text-left">
          <header className="mb-12">
            <h1 className="text-4xl font-black text-primary m-0 uppercase">Ulubione Łowiska</h1>
            <p className="text-on-surface-variant text-lg mt-2">Twoja osobista lista miejsc nad wodą.</p>
          </header>
          {isLoading ? (
            <div className="grid grid-cols-3 gap-8">{[1, 2, 3].map(i => <div key={i} className="h-80 bg-white dark:bg-slate-900 rounded-3xl animate-pulse" />)}</div>
          ) : favoriteLowiska.length === 0 ? (
            <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-outline-variant">
              <span className="material-symbols-outlined text-8xl text-slate-200 mb-6">sailing</span>
              <h2 className="text-2xl font-bold">Brak ulubionych</h2>
              <Link to="/mapy" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl no-underline mt-8">Otwórz Mapę</Link>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8">{favoriteLowiska.map(l => <LowiskoCard key={l._id} lowisko={l} okregiList={okregi} />)}</div>
          )}
        </main>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex flex-col min-h-screen pb-24 text-left">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 shadow-sm">
          <div className="flex justify-between items-center px-4 h-16 max-w-2xl mx-auto">
            <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sky-700">anchor</span><h1 className="text-xl font-black text-sky-800 m-0">Ulubione</h1></div>
          </div>
        </header>
        <main className="flex-grow pt-20 px-4 space-y-6 max-w-2xl mx-auto w-full">
          {isLoading ? (
            <div className="space-y-4">{[1, 2].map(i => <div key={i} className="h-40 bg-white dark:bg-slate-900 rounded-2xl animate-pulse" />)}</div>
          ) : favoriteLowiska.length === 0 ? (
            <div className="py-20 text-center opacity-40"><span className="material-symbols-outlined text-6xl mb-4">sailing</span><p className="font-bold">Brak ulubionych łowisk.</p></div>
          ) : (
            <div className="space-y-4">{favoriteLowiska.map(l => <LowiskoCard key={l._id} lowisko={l} okregiList={okregi} />)}</div>
          )}
        </main>
        <MobileNav />
      </div>
    </div>
  );
};

export default MojeLowiska;
