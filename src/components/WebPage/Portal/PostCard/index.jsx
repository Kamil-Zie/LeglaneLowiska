import { useState } from 'react';
import PostCardHeader from './Header';
import PostActions from './Actions';
import PostContent from './Content';
import PostInteractions from './Interactions'
import PostComments from './Comments';

const PostCard = ({ post, currentUser, onLike, onComment, onDelete, onEdit, onAddFriend }) => {
  const [showComments, setShowComments] = useState(false);

  const isLiked = post.polubienia.includes(currentUser._id);
  const isOwner = post.uzytkownik?._id === currentUser._id;
  const isAdmin = currentUser.rola === "admin" ? true : false;
  const isFriend = currentUser.friends?.includes(post.uzytkownik?._id);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-solid border-outline-variant dark:border-slate-800 shadow-sm group transition-all hover:shadow-2xl">
      {/* Image Header */}
      <PostCardHeader post={post} onDelete={onDelete} onEdit={onEdit} isOwner={isOwner} isAdmin={isAdmin}/>
      <div className="p-8">
        {/* User Info & Actions */}
        <PostActions post={post} isOwner={isOwner} isFriend={isFriend} onAddFriend={onAddFriend}/>
        {/* Content */}
        <PostContent post={post}/>
        {/* Interactions */}
        <PostInteractions post={post} onLike={onLike} showComments={showComments} setShowComments={setShowComments} currentUser={currentUser} isLiked={isLiked}/>

        {/* Comments Section */}
        {showComments && (<PostComments post={post} onComment={onComment} isLiked={isLiked}/>)}
      </div>
    </div>
  );
};

export default PostCard;
