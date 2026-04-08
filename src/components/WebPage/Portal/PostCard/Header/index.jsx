const PostCardHeader = ({ post, onDelete, onEdit, isOwner, isAdmin }) => {
    return(
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
        
        {(isOwner || isAdmin) && (
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
    )
}

export default PostCardHeader;