const PostContent = ({post}) => {
    return(
        <>
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
        </>
    )
}

export default PostContent;