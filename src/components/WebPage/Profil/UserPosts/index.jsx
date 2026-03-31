import React from 'react';

const UserPosts = ({ userPosts, isOwner, userData, onDeletePost }) => {
  return (
    <section className="mb-12 transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-primary dark:text-sky-400 tracking-tight m-0 uppercase">
            {isOwner ? 'Moje Połowy' : `Połowy ${userData?.nazwa}`}
          </h2>
          <p className="text-on-surface-variant dark:text-slate-400 text-sm m-0 font-medium">Historia złowionych okazów</p>
        </div>
      </div>
      
      {userPosts.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-solid border-outline-variant dark:border-slate-800 shadow-sm transition-colors">
          <span className="material-symbols-outlined text-7xl text-slate-200 dark:text-slate-800 mb-4">phishing</span>
          <p className="text-on-surface-variant dark:text-slate-400 font-black text-lg m-0 uppercase tracking-tighter">Brak wpisów</p>
          <p className="text-outline dark:text-slate-600 text-xs font-bold uppercase tracking-widest mt-2">Czas wybrać się nad wodę!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userPosts.map((post) => (
            <div key={post._id} className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-solid border-outline-variant dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col sm:flex-row">
              {/* Post Image */}
              <div className="w-full sm:w-56 h-56 sm:h-auto relative overflow-hidden flex-shrink-0">
                {post.zdjecie ? (
                  <img src={post.zdjecie} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="fish" />
                ) : (
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-700">image</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg">
                  {post.ryba}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-black text-on-surface dark:text-slate-100 m-0 leading-tight tracking-tight group-hover:text-primary dark:group-hover:text-sky-400 transition-colors">
                      {post.miejsce}
                    </h3>
                    <span className="text-[10px] text-outline dark:text-slate-500 font-black uppercase tracking-widest mt-1 block">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {isOwner && (
                    <button 
                      onClick={() => onDeletePost(post._id)}
                      className="w-9 h-9 rounded-xl bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all border-none cursor-pointer shadow-sm"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  )}
                </div>

                <div className="flex gap-2 mb-6">
                  <span className="px-3 py-1 bg-primary-container/10 dark:bg-primary-container/20 text-primary dark:text-sky-400 text-[9px] font-black rounded-lg border border-solid border-primary-container/20 dark:border-sky-400/20 shadow-sm uppercase tracking-tighter">
                    {post.rozmiar} CM
                  </span>
                  <span className="px-3 py-1 bg-secondary-container/10 dark:bg-secondary-container/20 text-secondary dark:text-teal-400 text-[9px] font-black rounded-lg border border-solid border-secondary-container/20 dark:border-teal-400/20 shadow-sm uppercase tracking-tighter">
                    {post.waga} KG
                  </span>
                </div>

                {post.opis && (
                  <p className="text-xs text-on-surface-variant dark:text-slate-400 line-clamp-2 m-0 italic font-medium leading-relaxed flex-grow">
                    "{post.opis}"
                  </p>
                )}

                <div className="flex items-center gap-6 mt-6 pt-6 border-0 border-t border-solid border-slate-100 dark:border-slate-800 transition-colors">
                   <div className="flex items-center gap-1.5 text-[10px] font-black text-outline dark:text-slate-500 uppercase tracking-widest">
                      <span className="material-symbols-outlined text-base">favorite</span>
                      {post.polubienia?.length || 0}
                   </div>
                   <div className="flex items-center gap-1.5 text-[10px] font-black text-outline dark:text-slate-500 uppercase tracking-widest">
                      <span className="material-symbols-outlined text-base">chat_bubble</span>
                      {post.komentarze?.length || 0}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UserPosts;
