import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, currentUser, onLike, onComment, onDelete, onEdit, onAddFriend }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();
  
  const isLiked = post.polubienia.includes(currentUser._id);
  const isOwner = post.uzytkownik?._id === currentUser._id;
  const isFriend = currentUser.friends?.includes(post.uzytkownik?._id);

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " lat temu";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " mies. temu";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " dni temu";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " godz. temu";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " min. temu";
    return Math.floor(seconds) + " sek. temu";
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-solid border-outline-variant dark:border-slate-800 shadow-sm group transition-all hover:shadow-2xl">
      {/* Image Header */}
      <div className="h-72 relative overflow-hidden">
        {post.zdjecie ? (
          <img 
            alt={post.ryba} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            src={post.zdjecie} 
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-7xl text-slate-300 dark:text-slate-700">image</span>
          </div>
        )}
        <div className="absolute top-5 right-5 bg-primary/80 backdrop-blur-md text-white text-[10px] px-4 py-2 rounded-full font-black uppercase tracking-widest shadow-xl z-10 border border-solid border-white/10">
          {post.ryba}
        </div>
        
        {isOwner && (
          <div className="absolute top-5 left-5 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 z-10">
            <button 
              onClick={onEdit}
              className="w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-primary dark:text-sky-400 flex items-center justify-center hover:scale-110 transition-all border-none cursor-pointer shadow-lg"
            >
              <span className="material-symbols-outlined text-xl">edit</span>
            </button>
            <button 
              onClick={onDelete}
              className="w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-error flex items-center justify-center hover:scale-110 transition-all border-none cursor-pointer shadow-lg"
            >
              <span className="material-symbols-outlined text-xl">delete</span>
            </button>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-8">
        {/* User Info & Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 border-2 border-solid border-white dark:border-slate-700 shadow-lg overflow-hidden cursor-pointer transform hover:rotate-3 transition-transform"
              onClick={() => navigate(`/profil/${post.uzytkownik?._id}`)}
            >
              {post.uzytkownik?.zdjecie ? (
                <img src={post.uzytkownik.zdjecie} className="w-full h-full object-cover" alt="avatar" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary text-white font-black text-lg">
                  {post.uzytkownik?.nazwa[0]}
                </div>
              )}
            </div>
            <div>
              <div 
                className="text-base font-black text-on-surface dark:text-slate-100 hover:text-primary dark:hover:text-sky-400 transition-colors cursor-pointer leading-tight uppercase tracking-tighter"
                onClick={() => navigate(`/profil/${post.uzytkownik?._id}`)}
              >
                {post.uzytkownik?.nazwa}
              </div>
              <div className="text-[10px] text-outline dark:text-slate-500 font-bold uppercase tracking-widest mt-0.5">{timeAgo(post.createdAt)}</div>
            </div>
          </div>
          
          {!isOwner && !isFriend && (
            <button 
              onClick={onAddFriend}
              className="flex items-center gap-2 text-[10px] font-black text-primary dark:text-sky-400 uppercase tracking-[0.2em] hover:bg-primary/10 dark:hover:bg-sky-400/10 px-5 py-2.5 rounded-xl transition-all border-none bg-transparent cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              Dodaj
            </button>
          )}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-black text-on-surface dark:text-slate-100 mb-3 leading-tight tracking-tighter uppercase">
          {post.miejsce}
        </h3>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-3 py-1.5 bg-primary-container/10 dark:bg-primary-container/20 text-primary dark:text-sky-400 text-[10px] font-black rounded-xl border border-solid border-primary-container/20 dark:border-sky-400/20 shadow-sm uppercase tracking-widest">
            {post.rozmiar} CM
          </span>
          <span className="px-3 py-1.5 bg-secondary-container/10 dark:bg-secondary-container/20 text-secondary dark:text-teal-400 text-[10px] font-black rounded-xl border border-solid border-secondary-container/20 dark:border-teal-400/20 shadow-sm uppercase tracking-widest">
            {post.waga} KG
          </span>
        </div>

        {post.opis && (
          <p className="text-sm text-on-surface-variant dark:text-slate-400 line-clamp-3 mb-8 leading-relaxed font-medium italic">
            "{post.opis}"
          </p>
        )}

        {/* Interactions */}
        <div className="flex items-center justify-between border-0 border-t border-solid border-slate-100 dark:border-slate-800 pt-6 transition-colors">
          <div className="flex items-center gap-6">
            <button 
              onClick={onLike}
              className={`flex items-center gap-2 text-xs font-black transition-all border-none bg-transparent cursor-pointer uppercase tracking-widest ${
                isLiked ? 'text-error scale-110' : 'text-on-surface-variant dark:text-slate-500 hover:text-error'
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${isLiked ? 'fill-1' : ''}`}>favorite</span> 
              {post.polubienia.length}
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-2 text-xs font-black transition-all border-none bg-transparent cursor-pointer uppercase tracking-widest ${
                showComments ? 'text-primary dark:text-sky-400' : 'text-on-surface-variant dark:text-slate-500 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-xl">chat_bubble</span> 
              {post.komentarze.length}
            </button>
          </div>
          <button className="text-on-surface-variant dark:text-slate-500 hover:text-primary dark:hover:text-sky-400 transition-colors border-none bg-transparent cursor-pointer">
            <span className="material-symbols-outlined text-xl">share</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-6 pt-6 border-0 border-t border-solid border-slate-50 dark:border-slate-800/50 space-y-6">
            <div className="max-h-72 overflow-y-auto pr-3 space-y-4 no-scrollbar">
              {post.komentarze.map((comment, idx) => (
                <div key={idx} className="flex gap-4 group/item">
                  <div 
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 cursor-pointer overflow-hidden border-2 border-solid border-white dark:border-slate-700 shadow-sm"
                    onClick={() => navigate(`/profil/${comment.uzytkownik?._id}`)}
                  >
                    {comment.uzytkownik?.zdjecie ? (
                      <img src={comment.uzytkownik.zdjecie} className="w-full h-full object-cover" alt="avatar" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-black">
                        {comment.uzytkownik?.nazwa?.[0]}
                      </div>
                    )}
                  </div>
                  <div className="bg-surface-container-low dark:bg-slate-800/50 px-5 py-3 rounded-2xl flex-grow transition-colors">
                    <div 
                      className="text-[10px] font-black text-on-surface dark:text-slate-200 mb-1 hover:text-primary dark:hover:text-sky-400 cursor-pointer uppercase tracking-widest transition-colors"
                      onClick={() => navigate(`/profil/${comment.uzytkownik?._id}`)}
                    >
                      {comment.uzytkownik?.nazwa}
                    </div>
                    <div className="text-sm text-on-surface-variant dark:text-slate-400 leading-relaxed font-medium">{comment.tekst}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 items-center pt-2">
              <div className="flex-grow relative">
                <input
                  type="text"
                  placeholder="Napisz coś od siebie..."
                  className="w-full bg-surface-container-low dark:bg-slate-800 border-none rounded-2xl px-6 py-4 text-sm dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-outline dark:placeholder:text-slate-600"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && commentText) {
                      onComment(commentText);
                      setCommentText('');
                    }
                  }}
                />
              </div>
              <button 
                onClick={() => {
                  if (commentText) {
                    onComment(commentText);
                    setCommentText('');
                  }
                }}
                className="w-12 h-12 rounded-2xl bg-primary dark:bg-sky-600 text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all border-none cursor-pointer disabled:opacity-50 disabled:grayscale shadow-lg shadow-primary/20"
                disabled={!commentText}
              >
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
