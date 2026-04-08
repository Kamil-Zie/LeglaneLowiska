const PostInteractions = ({post, onLike, showComments, setShowComments, isLiked}) => {

    return(
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
    )
}

export default PostInteractions;