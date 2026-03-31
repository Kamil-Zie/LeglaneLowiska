import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar';
import { useAuth } from '../../../context/AuthContext';
import LowiskoCard from '../LowiskoCard';

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
        const filtered = allLowiska.filter(lowisko => user.ulubioneLowiska.includes(lowisko._id));
        setFavoriteLowiska(filtered);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [user]);

  return (
    <div className="bg-surface dark:bg-slate-950 font-body text-on-surface min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-primary dark:text-sky-400 tracking-tight m-0">Moje Ulubione Łowiska</h1>
          <p className="text-on-surface-variant dark:text-slate-400 text-lg m-0 mt-2">Twoja osobista lista sprawdzonych miejsc nad wodą.</p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-80 bg-white dark:bg-slate-900 rounded-3xl border border-solid border-outline-variant dark:border-slate-800 animate-pulse" />
            ))}
          </div>
        ) : favoriteLowiska.length === 0 ? (
          <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-outline-variant dark:border-slate-800">
            <span className="material-symbols-outlined text-8xl text-slate-200 dark:text-slate-800 mb-6">sailing</span>
            <h2 className="text-2xl font-bold text-on-surface dark:text-slate-300 m-0">Brak ulubionych łowisk</h2>
            <p className="text-outline mt-2 mb-8">Odkryj nowe miejsca na mapie i dodaj je do swojej listy.</p>
            <a href="/mapy" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all no-underline">
              <span className="material-symbols-outlined">map</span>
              Otwórz Mapę
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favoriteLowiska.map((lowisko) => (
              <div key={lowisko._id} className="h-full">
                <LowiskoCard lowisko={lowisko} okregiList={okregi} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MojeLowiska;
