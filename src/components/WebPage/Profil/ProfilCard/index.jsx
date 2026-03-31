import React from 'react';
import { Avatar, IconButton, Tooltip } from '@mui/material';

const ProfilCard = ({ userData, onEdit, isOwner }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-solid border-outline-variant dark:border-slate-800 shadow-xl relative mb-12 transition-colors duration-300">
      {/* Banner Area */}
      <div className="h-56 bg-gradient-to-r from-primary to-tertiary-container relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO25H3bajRv_yM8H_8vA0WctgcYbR95cuQ7t2RiVtyzWQ0_dZCPXxGGT7PJ5_LVfQCHnI8sH1gPJ31qbrfkjSod601DaLxxLcNb-cfE5vfAjg-4NNJSMXNlo84zIRtzEP2XlGP1ObNoZA8R_3zx40f2To_uiSE5IxvPdGpd7oRmp_HtP0UwcXoHr8kwQJaOYZa7fl7cqQbM_alDFTTBR3LXNVqsDOOlyhcZcxdMuYJuE-qB5GexkR5jlbGaU-B7PKESzFPgLB3dXVr" 
            alt="banner"
          />
        </div>
        
        {isOwner && (
          <div className="absolute top-6 right-6">
            <Tooltip title="Edytuj profil">
              <button 
                onClick={onEdit}
                className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl text-white border border-solid border-white/20 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer shadow-lg"
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
            </Tooltip>
          </div>
        )}
      </div>

      {/* Avatar & Basic Info Container */}
      <div className="px-10 pb-10 flex flex-col items-center -mt-24 relative z-10">
        <div className="relative">
          <Avatar 
            src={userData?.zdjecie} 
            sx={{ 
              width: 180, 
              height: 180, 
              border: '8px solid', 
              borderColor: 'background.paper',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
              bgcolor: 'primary.main',
              fontSize: 72,
              fontWeight: 900
            }}
          >
            {userData?.nazwa?.charAt(0) || '?'}
          </Avatar>
          <div className="absolute bottom-6 right-3 w-7 h-7 bg-green-500 border-4 border-solid border-white dark:border-slate-900 rounded-full shadow-lg"></div>
        </div>

        <div className="text-center mt-6">
          <h2 className="text-4xl font-black text-on-surface dark:text-slate-100 m-0 tracking-tighter leading-none">{userData?.imie} {userData?.nazwisko}</h2>
          <p className="text-primary dark:text-sky-400 font-black text-sm uppercase tracking-[0.2em] mt-2 m-0">@{userData?.nazwa || 'użytkownik'}</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
           <span className="bg-primary-container/10 dark:bg-primary-container/20 text-primary dark:text-sky-400 text-[10px] font-black px-5 py-2 rounded-full border border-solid border-primary-container/20 dark:border-sky-400/20 uppercase tracking-widest shadow-sm">
            {userData?.nrKartyPZW ? 'Czlonek PZW' : 'Niezrzeszony'}
          </span>
          <span className="bg-secondary-container/10 dark:bg-secondary-container/20 text-secondary dark:text-teal-400 text-[10px] font-black px-5 py-2 rounded-full border border-solid border-secondary-container/20 dark:border-teal-400/20 uppercase tracking-widest shadow-sm">
            {userData?.miasto || 'Wędkarz'}
          </span>
          <span className="bg-tertiary-container/10 dark:bg-tertiary-container/20 text-tertiary dark:text-sky-300 text-[10px] font-black px-5 py-2 rounded-full border border-solid border-tertiary-container/20 dark:border-sky-300/20 uppercase tracking-widest flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-sm fill-1">military_tech</span>
            {userData?.punkty || 0} PKT
          </span>
        </div>

        <p className="max-w-2xl text-center text-on-surface-variant dark:text-slate-400 mt-8 text-sm leading-relaxed m-0 italic font-medium">
          "{userData?.opis || "Wędkarstwo to nie tylko hobby, to sposób na życie. Zawsze w poszukiwaniu kolejnego rekordu!"}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-10 pt-10 border-0 border-t border-solid border-slate-100 dark:border-slate-800">
           <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-solid border-slate-100 dark:border-slate-800 transition-colors">
              <span className="material-symbols-outlined text-primary dark:text-sky-400 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm">mail</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-outline dark:text-slate-500 font-black uppercase tracking-widest">Email</span>
                <span className="text-sm font-bold text-on-surface dark:text-slate-200">{userData?.email || 'Niedostępny'}</span>
              </div>
           </div>
           <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-solid border-slate-100 dark:border-slate-800 transition-colors">
              <span className="material-symbols-outlined text-primary dark:text-sky-400 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm">badge</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-outline dark:text-slate-500 font-black uppercase tracking-widest">Karta PZW</span>
                <span className="text-sm font-bold text-on-surface dark:text-slate-200">{userData?.nrKartyPZW || 'Brak wpisu'}</span>
              </div>
           </div>
           <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-solid border-slate-100 dark:border-slate-800 transition-colors">
              <span className="material-symbols-outlined text-primary dark:text-sky-400 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm">location_on</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-outline dark:text-slate-500 font-black uppercase tracking-widest">Lokalizacja</span>
                <span className="text-sm font-bold text-on-surface dark:text-slate-200">{userData?.lokalizacja || userData?.miasto || 'Polska'}</span>
              </div>
           </div>
           <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-solid border-slate-100 dark:border-slate-800 transition-colors">
              <span className="material-symbols-outlined text-primary dark:text-sky-400 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm">history</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-outline dark:text-slate-500 font-black uppercase tracking-widest">Dołączył</span>
                <span className="text-sm font-bold text-on-surface dark:text-slate-200">{userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Niedawno'}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilCard;
