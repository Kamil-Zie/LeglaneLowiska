import React from 'react';

const ProfilStats = ({ userPosts, userData }) => {
  const recordPost = userPosts.length > 0 
    ? userPosts.reduce((prev, current) => (parseFloat(prev.waga) > parseFloat(current.waga)) ? prev : current)
    : null;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary shadow-inner">
          <span className="material-symbols-outlined text-3xl">phishing</span>
        </div>
        <div>
          <span className="block text-3xl font-black text-on-surface dark:text-slate-100 tracking-tighter leading-none">{userPosts.length}</span>
          <span className="text-[10px] font-black text-outline dark:text-slate-500 uppercase tracking-widest mt-1">Wpisy</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary shadow-inner">
          <span className="material-symbols-outlined text-3xl">trophy</span>
        </div>
        <div>
          <span className="block text-3xl font-black text-on-surface dark:text-slate-100 tracking-tighter leading-none">
            {recordPost ? `${recordPost.waga}kg` : '0kg'}
          </span>
          <span className="text-[10px] font-black text-outline dark:text-slate-500 uppercase tracking-widest mt-1">
            {recordPost ? recordPost.ryba : 'Rekord'}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-inner">
          <span className="material-symbols-outlined text-3xl">favorite</span>
        </div>
        <div>
          <span className="block text-3xl font-black text-on-surface dark:text-slate-100 tracking-tighter leading-none">{userData?.ulubioneLowiska?.length || 0}</span>
          <span className="text-[10px] font-black text-outline dark:text-slate-500 uppercase tracking-widest mt-1">Ulubione</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant shadow-inner">
          <span className="material-symbols-outlined text-3xl">group</span>
        </div>
        <div>
          <span className="block text-3xl font-black text-on-surface dark:text-slate-100 tracking-tighter leading-none">{userData?.friends?.length || 0}</span>
          <span className="text-[10px] font-black text-outline dark:text-slate-500 uppercase tracking-widest mt-1">Znajomi</span>
        </div>
      </div>
    </section>
  );
};

export default ProfilStats;
