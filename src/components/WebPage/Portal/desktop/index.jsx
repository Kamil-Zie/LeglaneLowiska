import NavBar from "../../NavBar/desktop";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "../PostCard";
import PostSkeleton from "../PostSkeleton";
import { useAuth } from "../../../../context/AuthContext";

const PortalDesktop = ({posts, handleAddFriend, handleEditOpen, handleDeleteClick, handleComment, handleLike, handleOpen, isLoading}) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    return (<>
    <NavBar />
        <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-8">
          <div className="grid grid-cols-12 gap-8 text-left">
            <aside className="col-span-3 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 p-8 shadow-sm sticky top-24">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary mb-6 border-4 border-solid border-white dark:border-slate-800 shadow-xl overflow-hidden">
                    {user.zdjecie ? <img src={user.zdjecie} className="w-full h-full object-cover" alt="me" /> : <span className="text-3xl font-black">{user.nazwa[0]}</span>}
                  </div>
                  <h2 className="text-xl font-black text-on-surface dark:text-slate-100 mb-1">{user.imie} {user.nazwisko}</h2>
                  <p className="text-xs text-primary font-bold uppercase tracking-widest mb-6">@{user.nazwa}</p>
                  <div className="grid grid-cols-3 w-full border-0 border-t border-solid border-slate-100 dark:border-slate-800 pt-6">
                    <div><div className="text-lg font-black text-primary">{user.friends?.length || 0}</div><div className="text-[10px] text-outline uppercase font-bold">Znajomi</div></div>
                    <div><div className="text-lg font-black text-primary">{posts.filter(p => p.uzytkownik?._id === user._id).length}</div><div className="text-[10px] text-outline uppercase font-bold">Posty</div></div>
                    <div><div className="text-lg font-black text-primary">{user.ulubioneLowiska?.length || 0}</div><div className="text-[10px] text-outline uppercase font-bold">Ulubione</div></div>
                  </div>
                </div>
              </div>
            </aside>
            <div className="col-span-6 space-y-8">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center text-primary font-black overflow-hidden border-2 border-solid border-white shadow-sm">
                    {user.zdjecie ? <img src={user.zdjecie} className="w-full h-full object-cover" alt="me" /> : user.nazwa[0]}
                  </div>
                  <button onClick={handleOpen} className="flex-grow bg-surface-container dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-surface-container-high text-left px-6 py-4 rounded-2xl text-on-surface-variant text-sm font-bold border-none cursor-pointer">
                    Pochwal się ostatnim połowem {user?.nazwa}!
                  </button>
                </div>
              </div>
              <div className="space-y-8">
                {isLoading ? [1, 2].map(i => <PostSkeleton key={i} />) : posts.map(post => <PostCard key={post._id} post={post} currentUser={user} onLike={() => handleLike(post._id)} onComment={(tekst) => handleComment(post._id, tekst)} onDelete={() => handleDeleteClick(post._id)} onEdit={() => handleEditOpen(post)} onAddFriend={() => handleAddFriend(post.uzytkownik?._id)} />)}
              </div>
            </div>
            <aside className="col-span-3 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-solid border-outline-variant p-8 shadow-sm">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">military_tech</span>
                  Ranking: Szczupak
                </h3>
                <div className="space-y-4">
                  {posts
                    .filter(p => p.ryba === 'Szczupak' && new Date(p.createdAt) >= new Date(new Date().setFullYear(new Date().getFullYear() - 1)))
                    .sort((a, b) => b.rozmiar - a.rozmiar)
                    .slice(0, 3)
                    .map((post, i) => (
                      <div key={i} className="flex items-center justify-between group cursor-pointer" onClick={() => navigate(`/profil/${post.uzytkownik._id}`)}>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-black ${i === 0 ? 'text-yellow-500' : 'text-slate-400'}`}>{i + 1}</span>
                          <span className="text-sm font-bold truncate max-w-[100px]">{post.uzytkownik.nazwa}</span>
                        </div>
                        <span className="text-[10px] font-black bg-primary/10 text-primary px-2.5 py-1 rounded-lg">{post.rozmiar} cm</span>
                      </div>
                    ))}
                </div>
                <Link to="/ranking" className="no-underline">
                  <button className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border-none cursor-pointer hover:brightness-110 transition-all">
                    Pełny Ranking
                  </button>
                </Link>
              </div>
            </aside>
          </div>
        </main>
    </>)
}

export default PortalDesktop;