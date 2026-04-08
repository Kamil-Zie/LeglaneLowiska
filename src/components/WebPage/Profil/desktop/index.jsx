import Navbar from '../../NavBar/desktop';
import ProfilCard from '../ProfilCard';
import ProfilStats from '../ProfilStats';
import FriendsPreview from '../FriendsPreview';
import UserPosts from '../UserPosts';
import ProfilSkeleton from '../ProfilSkeleton';
const PorfilDesktop = ({isLoading, userData, handleEditOpen, isOwner, userPosts, setConfirmDialog}) => {
    return (
        <>
        <Navbar />
        <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-8 text-left">
          {isLoading ? <ProfilSkeleton /> : (
            <div className="max-w-4xl mx-auto">
              <ProfilCard userData={userData} onEdit={handleEditOpen} isOwner={isOwner} userPosts={userPosts} />
              <ProfilStats userPosts={userPosts} userData={userData} />
              <FriendsPreview userData={userData} isOwner={isOwner} />
              <UserPosts userPosts={userPosts} isOwner={isOwner} userData={userData} onDeletePost={(id) => setConfirmDialog({ open: true, postId: id })} />
            </div>
          )}
        </main>
        </>
    )
}

export default PorfilDesktop;