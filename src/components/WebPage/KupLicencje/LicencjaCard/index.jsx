const LicencjaCard = ({ lic, okreg, onBuy }) => {
  return (
    <div className="group bg-surface-container-lowest rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      <div className="h-48 overflow-hidden relative bg-primary-container/10 dark:bg-slate-800/50 flex items-center justify-center transition-colors">
        <span className="material-symbols-outlined text-7xl text-primary dark:text-sky-400 opacity-20 group-hover:scale-110 transition-transform duration-700">
          description
        </span>
        <div className="absolute top-5 left-5 flex gap-2">
          <span className={`text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-solid transition-all ${
            lic.czyCzlonekPZW 
            ? 'bg-primary/90 text-white border-white/20' 
            : 'bg-white/90 dark:bg-slate-900/90 text-primary dark:text-sky-400 border-primary/20 dark:border-sky-400/20'
          }`}>
            {lic.czyCzlonekPZW ? "CZŁONEK PZW" : "NIEZRZESZONY"}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-surface-container-lowest to-transparent" />
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-black text-on-surface dark:text-slate-100 group-hover:text-primary dark:group-hover:text-sky-400 transition-colors m-0 leading-tight tracking-tighter uppercase">
            {okreg?.nazwa || "Okręg PZW"}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-outline dark:text-slate-500 mb-6 font-bold uppercase tracking-widest text-[10px]">
          <span className="material-symbols-outlined text-base">schedule</span>
          Ważność: {lic.czasTrwania} {lic.czasTrwania === 1 ? 'dzień' : 'dni'}
        </div>

        <p className="text-on-surface-variant dark:text-slate-400 text-sm mb-8 line-clamp-3 m-0 leading-relaxed font-medium">
          {lic.opis || "Zezwolenie na amatorski połów ryb wędką w wodach ogólnodostępnych wybranego okręgu."}
        </p>

        <div className="mt-auto pt-8 border-0 border-t border-solid border-outline-variant/30 dark:border-slate-800 flex items-center justify-between transition-colors">
          <div>
            <span className="text-outline dark:text-slate-500 text-[10px] block mb-1 uppercase font-black tracking-[0.2em]">Cena brutto</span>
            <span className="text-3xl font-black text-primary dark:text-sky-400 tracking-tighter">
              {lic.cena?.toFixed(2)} <span className="text-sm font-bold opacity-60">PLN</span>
            </span>
          </div>
          <button 
            onClick={() => onBuy(lic._id)}
            className="bg-primary dark:bg-sky-600 text-white px-6 py-4 rounded-2xl font-black hover:brightness-110 active:scale-95 transition-all text-xs border-none cursor-pointer shadow-xl shadow-primary/20 uppercase tracking-widest flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            Kup
          </button>
        </div>
      </div>
    </div>
  );
};

export default LicencjaCard;
