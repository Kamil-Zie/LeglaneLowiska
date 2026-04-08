import MobileHeader from "../../Header/mobile";
import MobileNav from "../../NavBar/mobile";
import ProfilSkeleton from "../ProfilSkeleton";
import ProfilCard from "../ProfilCard";
import FriendsPreview from "../FriendsPreview";
import UserPosts from "../UserPosts";
import LowiskoCard from "../../LowiskoCard";
const ProfilMobile = ({isLoading, userData, handleEditOpen, isOwner, userPosts, favoriteLowiska, okregi, setConfirmDialog}) => {
    return (
        <>
            <MobileHeader />
            <main className="flex-grow pt-20 px-4 space-y-8 max-w-2xl mx-auto w-full">
            {isLoading ? <ProfilSkeleton /> : (
                <>
                <ProfilCard userData={userData} onEdit={handleEditOpen} isOwner={isOwner} userPosts={userPosts} />
                <FriendsPreview userData={userData} isOwner={isOwner} />
                <section>
                    <h3 className="text-lg font-extrabold mb-4">Ulubione łowiska</h3>
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                    {favoriteLowiska.map(l => <div key={l._id} className="flex-shrink-0 w-64"><LowiskoCard lowisko={l} okregiList={okregi} /></div>)}
                    </div>
                </section>
                <UserPosts userPosts={userPosts} isOwner={isOwner} userData={userData} onDeletePost={(id) => setConfirmDialog({ open: true, postId: id })} />
                </>
            )}
            </main>
            <MobileNav />
        </>
    )
}

export default ProfilMobile;