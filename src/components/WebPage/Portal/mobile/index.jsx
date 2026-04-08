import MobileHeader from "../../Header/mobile";
import MobileNav from "../../NavBar/mobile";
import PostCard from "../PostCard";
import PostSkeleton from "../PostSkeleton";
import { useAuth } from "../../../../context/AuthContext";

const PortalMobile = ({posts, handleAddFriend, handleEditOpen, handleDeleteClick, handleComment, handleLike, handleOpen, isLoading}) => {
    const { user } = useAuth();
    return (
        <>
        <MobileHeader />
        <main className="flex-grow pt-20 px-4 space-y-8 max-w-2xl mx-auto w-full text-left">
          <section>
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0 flex items-center justify-center text-primary font-black overflow-hidden border-2 border-solid border-white">
                  {user.zdjecie ? <img src={user.zdjecie} className="w-full h-full object-cover" alt="me" /> : user.nazwa[0]}
                </div>
                <button onClick={handleOpen} className="flex-grow bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high text-left px-6 py-4 rounded-2xl text-on-surface-variant text-sm font-bold border-none cursor-pointer text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300">
                  Co u Ciebie, {user.imie}?
                </button>
              </div>
            </div>
          </section>
          <section className="space-y-8">
            {isLoading ? [1, 2].map(i => <PostSkeleton key={i} />) : posts.map(post => <PostCard key={post._id} post={post} currentUser={user} onLike={() => handleLike(post._id)} onComment={(tekst) => handleComment(post._id, tekst)} onDelete={() => handleDeleteClick(post._id)} onEdit={() => handleEditOpen(post)} onAddFriend={() => handleAddFriend(post.uzytkownik?._id)} />)}
          </section>
        </main>
        <MobileNav/>
        </>
    )
}

export default PortalMobile;