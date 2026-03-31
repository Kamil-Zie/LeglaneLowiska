import axios from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const LowiskoCard = ({ lowisko, okregiList, isMapView = false }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(
    user?.ulubioneLowiska?.includes(lowisko._id) || false
  );
  const [okreg, setOkreg] = useState();

  const dodajDoUlubionych = async (lowiskoId) => {
    try {
      await axios.post(`/users/update/favFishery/${user._id}`, { lowiskoId });
      setIsFavorite(!isFavorite);
      
      if (!user.ulubioneLowiska.includes(lowiskoId)) {
        user.ulubioneLowiska.push(lowiskoId);
      } else {
        user.ulubioneLowiska = user.ulubioneLowiska.filter(id => id !== lowiskoId);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  useEffect(() => {
    if (okregiList && (lowisko.idOkregu || lowisko.idOkreguPZW)) {
      const okregId = lowisko.idOkregu || lowisko.idOkreguPZW;
      const foundOkreg = okregiList.find((o) => o._id === okregId);
      setOkreg(foundOkreg);
    }
  }, [okregiList, lowisko.idOkregu, lowisko.idOkreguPZW]);

  const getTypeColor = (type) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('pzw')) return 'bg-primary-container/20 text-primary border-primary-container/30 dark:border-primary/20';
    if (t.includes('komercyjne')) return 'bg-secondary-container/20 text-secondary border-secondary-container/30 dark:border-secondary/20';
    if (t.includes('rzeka')) return 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800/50';
    return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
  };

  if (isMapView) {
    return (
      <div className="group p-5 bg-surface-container-lowest rounded-[1.5rem] border border-solid border-outline-variant dark:border-slate-800 hover:border-primary dark:hover:border-sky-400 hover:shadow-xl transition-all cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-black text-lg text-on-surface dark:text-slate-100 group-hover:text-primary dark:group-hover:text-sky-400 transition-colors m-0 leading-tight tracking-tight">
              {lowisko.nazwa}
            </h3>
            {okreg && (
              <span className="text-[9px] font-black text-primary/70 dark:text-sky-400/70 uppercase tracking-widest">
                {okreg.nazwa}
              </span>
            )}
          </div>
          <span className="text-[9px] font-black px-2 py-1 bg-secondary-container dark:bg-slate-800 text-on-secondary-container dark:text-teal-400 rounded-lg uppercase tracking-tighter shadow-sm border border-solid border-secondary-container/30 dark:border-slate-700">
            {lowisko.miasto}
          </span>
        </div>
        
        <div className="flex gap-2 mb-4">
           <span className={`text-[8px] font-black px-2 py-0.5 rounded-md border border-solid uppercase tracking-widest ${getTypeColor(lowisko.typeLowiska)}`}>
            {lowisko.typeLowiska || 'Łowisko'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/kup-licencje" className="flex-grow no-underline">
            <button className="w-full bg-secondary dark:bg-teal-600 text-on-secondary py-3 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border-none cursor-pointer shadow-lg shadow-secondary/20">
              <span className="material-symbols-outlined text-base">shopping_cart</span>
              Licencja
            </button>
          </Link>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              dodajDoUlubionych(lowisko._id);
            }}
            className={`p-2.5 border border-solid border-outline-variant dark:border-slate-700 rounded-xl hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors bg-transparent cursor-pointer flex items-center justify-center ${isFavorite ? 'text-error border-error/30 bg-error/5' : 'text-primary dark:text-sky-400'}`}
          >
            <span className={`material-symbols-outlined text-lg ${isFavorite ? 'fill-1' : ''}`}>
              {isFavorite ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-solid border-outline-variant dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all flex flex-col h-full w-full group">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-black text-on-surface dark:text-slate-100 m-0 leading-tight tracking-tight group-hover:text-primary dark:group-hover:text-sky-400 transition-colors">
            {lowisko.nazwa}
          </h3>
          <div className="flex items-center gap-1 bg-surface-container-low dark:bg-slate-800 px-2 py-1 rounded-lg border border-solid border-outline-variant/20 dark:border-slate-700 shadow-sm">
            <span className="material-symbols-outlined text-sm text-yellow-500 fill-1">star</span>
            <span className="text-xs font-black text-on-surface dark:text-slate-300">{lowisko.sredniaOcen || '0.0'}</span>
          </div>
        </div>

        {okreg && (
          <div className="text-[10px] font-black text-primary dark:text-sky-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-1.5 opacity-80">
            <span className="material-symbols-outlined text-xs">account_balance</span>
            {okreg.nazwa}
          </div>
        )}

        <div className="flex gap-2 mb-6">
           <span className={`text-[9px] font-black px-2.5 py-1 rounded-full border border-solid uppercase tracking-widest shadow-sm ${getTypeColor(lowisko.typeLowiska)}`}>
            {lowisko.typeLowiska || 'Łowisko'}
          </span>
          <span className="text-[9px] font-black px-2.5 py-1 rounded-full border border-solid border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-widest shadow-sm">
            {lowisko.miasto}
          </span>
        </div>

        <p className="text-sm text-on-surface-variant dark:text-slate-400 mb-6 m-0 line-clamp-3 leading-relaxed font-medium">
          {lowisko.opis || "Brak opisu dla tego łowiska. Zapytaj w lokalnym okręgu o szczegóły i regulamin."}
        </p>

        <div className="space-y-2 border-0 border-t border-solid border-slate-100 dark:border-slate-800 pt-6">
          <div className="flex items-center justify-between text-[10px] text-outline dark:text-slate-500 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs">explore</span>
              {lowisko.lat?.toFixed(4)}, {lowisko.lng?.toFixed(4)}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs">chat</span>
              {lowisko.iloscOcen || 0} opinii
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50/50 dark:bg-slate-800/30 border-0 border-t border-solid border-slate-100 dark:border-slate-800 flex gap-3">
        <button 
          onClick={() => dodajDoUlubionych(lowisko._id)}
          className={`w-14 h-14 rounded-2xl font-bold text-sm transition-all flex items-center justify-center border border-solid cursor-pointer shadow-lg active:scale-95 ${
            isFavorite 
            ? 'bg-error/10 text-error border-error/20 hover:bg-error/20' 
            : 'bg-white dark:bg-slate-900 text-on-surface dark:text-slate-300 border-outline-variant dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <span className={`material-symbols-outlined text-xl ${isFavorite ? 'fill-1' : ''}`}>
            {isFavorite ? 'favorite' : 'favorite_border'}
          </span>
        </button>
        <Link to="/kup-licencje" className="flex-grow no-underline">
          <button className="w-full h-14 bg-primary dark:bg-sky-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center gap-3 border-none cursor-pointer shadow-xl shadow-primary/20 active:scale-95">
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            Kup zezwolenie
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LowiskoCard;
