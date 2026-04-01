import React from 'react';
import { Avatar, Tooltip } from '@mui/material';

const ProfilCard = ({ userData, onEdit, isOwner, userPosts }) => {
  // Find record catch
  const recordFish = userPosts?.length > 0 
    ? [...userPosts].sort((a, b) => (b.rozmiar || 0) - (a.rozmiar || 0))[0]
    : null;

  return (
    <>
      {/* --- DESKTOP PROFIL CARD --- */}
      <div className="hidden md:block bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-solid border-outline-variant dark:border-slate-800 shadow-xl relative mb-12">
        <div className="h-56 bg-gradient-to-r from-primary to-tertiary-container relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO25H3bajRv_yM8H_8vA0WctgcYbR95cuQ7t2RiVtyzWQ0_dZCPXxGGT7PJ5_LVfQCHnI8sH1gPJ31qbrfkjSod601DaLxxLcNb-cfE5vfAjg-4NNJSMXNlo84zIRtzEP2XlGP1ObNoZA8R_3zx40f2To_uiSE5IxvPdGpd7oRmp_HtP0UwcXoHr8kwQJaOYZa7fl7cqQbM_alDFTTBR3LXNVqsDOOlyhcZcxdMuYJuE-qB5GexkR5jlbGaU-B7PKESzFPgLB3dXVr" alt="banner" />
          </div>
          {isOwner && (
            <div className="absolute top-6 right-6">
              <Tooltip title="Edytuj profil">
                <button onClick={onEdit} className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl text-white border border-solid border-white/20 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer shadow-lg">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </Tooltip>
            </div>
          )}
        </div>
        <div className="px-10 pb-10 flex flex-col items-center -mt-24 relative z-10">
          <div className="relative">
            <Avatar src={userData?.zdjecie} sx={{ width: 180, height: 180, border: '8px solid', borderColor: 'background.paper', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', bgcolor: 'primary.main', fontSize: 72, fontWeight: 900 }}>
              {userData?.nazwa?.charAt(0) || '?'}
            </Avatar>
          </div>
          <div className="text-center mt-6">
            <h2 className="text-4xl font-black text-on-surface dark:text-slate-100 m-0 tracking-tighter leading-none">{userData?.imie} {userData?.nazwisko}</h2>
            <p className="text-primary dark:text-sky-400 font-black text-sm uppercase tracking-[0.2em] mt-2 m-0">@{userData?.nazwa}</p>
          </div>
          <p className="max-w-2xl text-center text-on-surface-variant dark:text-slate-400 mt-8 text-sm italic font-medium">"{userData?.opis || "Wędkarstwo to sposób na życie."}"</p>
        </div>
      </div>

      {/* --- MOBILE PROFIL CARD --- */}
      <section className="md:hidden flex flex-col items-center py-6">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden bg-primary-container">
            <Avatar src={userData?.zdjecie} className="w-full h-full object-cover" sx={{ width: '100%', height: '100%', bgcolor: 'primary.main', fontSize: 48, fontWeight: 900 }}>
              {userData?.nazwa?.charAt(0) || '?'}
            </Avatar>
          </div>
          {isOwner && (
            <button onClick={onEdit} className="absolute bottom-1 right-1 bg-primary p-2 rounded-full text-white shadow-lg border-2 border-white dark:border-slate-800 flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          )}
        </div>
        <h2 className="text-2xl font-extrabold text-on-surface dark:text-slate-100 tracking-tight m-0 uppercase">{userData?.imie} {userData?.nazwisko}</h2>
        <p className="text-primary dark:text-sky-400 font-medium mb-6 mt-1 m-0">Wędkarz • {userData?.miasto || 'Polska'}</p>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-solid border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-tertiary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>
            <span className="text-2xl font-black">{recordFish ? `${recordFish.rozmiar} cm` : '--'}</span>
            <span className="text-xs font-bold text-slate-400 uppercase">Rekord</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-solid border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-secondary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
            <span className="text-2xl font-black">{userPosts?.length || 0}</span>
            <span className="text-xs font-bold text-slate-400 uppercase">Posty</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilCard;
