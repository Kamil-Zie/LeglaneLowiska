import { Link } from 'react-router-dom';

const UserPosts = ({ userPosts, isOwner, userData, onDeletePost }) => {
  return (
    <>
      {/* --- DESKTOP USER POSTS --- */}
      <section className="hidden md:block mb-12">
        <div className="flex justify-between items-center mb-8 text-left">
          <div>
            <h2 className="text-2xl font-black text-primary dark:text-sky-400 tracking-tight m-0 uppercase">{isOwner ? 'Moje Połowy' : `Połowy ${userData?.nazwa}`}</h2>
            <p className="text-on-surface-variant dark:text-slate-400 text-sm m-0 font-medium">Historia złowionych okazów</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 text-left">
          {userPosts.map((post) => (
            <div key={post._id} className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-solid border-outline-variant dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-row">
              <div className="w-48 h-48 relative overflow-hidden flex-shrink-0">
                {post.zdjecie ? <img src={post.zdjecie} className="w-full h-full object-cover" alt="fish" /> : <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><span className="material-symbols-outlined text-5xl">image</span></div>}
                <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-[0.2em]">{post.ryba}</div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black m-0 leading-tight">{post.miejsce}</h3>
                    <span className="text-[10px] text-outline font-black uppercase mt-1 block">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  {isOwner && <button onClick={() => onDeletePost(post._id)} className="w-9 h-9 rounded-xl bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all border-none cursor-pointer"><span className="material-symbols-outlined text-lg">delete</span></button>}
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="px-3 py-1 bg-primary-container/10 text-primary text-[9px] font-black rounded-lg border border-solid border-primary-container/20">{post.rozmiar} CM</span>
                  <span className="px-3 py-1 bg-secondary-container/10 text-secondary text-[9px] font-black rounded-lg border border-solid border-secondary-container/20">{post.waga} KG</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MOBILE USER POSTS --- */}
      <section className="md:hidden mb-10">
        <div className="flex items-center gap-2 mb-4 text-left">
          <h3 className="text-lg font-extrabold text-on-surface dark:text-slate-100 uppercase m-0">Posty</h3>
          <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full text-xs font-bold">{userPosts?.length || 0}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {userPosts.map((post) => (
            <div key={post._id} className="aspect-square relative rounded-xl overflow-hidden shadow-md">
              {post.zdjecie ? <img src={post.zdjecie} className="w-full h-full object-cover" alt="fish" /> : <div className="w-full h-full bg-slate-100 flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-slate-300">image</span></div>}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-[10px] font-bold bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>thumb_up</span> {post.polubienia?.length || 0}
              </div>
            </div>
          ))}
          {isOwner && (
            <Link to="/portal" className="no-underline">
              <div className="aspect-square relative rounded-xl group border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-900 cursor-pointer text-left">
                <div className="text-center">
                  <span className="material-symbols-outlined text-slate-400 text-3xl block mb-1">add_a_photo</span>
                  <span className="text-xs font-bold text-slate-400">Dodaj</span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default UserPosts;
