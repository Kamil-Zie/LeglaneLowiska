import { useNavigate } from "react-router-dom";

const PostActions = ({post,isOwner,isFriend,onAddFriend}) => {
    const navigate = useNavigate();
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
    return(
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
    )
}

export default PostActions;