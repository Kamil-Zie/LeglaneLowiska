import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostComments = ({post,onComment,isLiked}) => {
    const [commentText, setCommentText] = useState('');
    const navigate = useNavigate();
    return(
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
                    <div className="flex items-center gap-1">
                      <button
                      className="flex items-center gap-2 text-xs font-black transition-all border-none bg-transparent cursor-pointer uppercase tracking-widest text-on-surface-variant dark:text-slate-500 hover:text-error">
                        <span className={`material-symbols-outlined text-xl ${isLiked ? 'fill-1' : ''}`}>favorite</span>
                      </button>
                      <button 
                      className="text-on-surface-variant dark:text-slate-500 hover:text-primary dark:hover:text-sky-500 transition-colors border-none bg-transparent cursor-pointer">
                        <span className="material-symbols-outlined text-xl">chat_bubble</span>
                      </button>
                    </div>
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
          </div>);
}

export default PostComments;