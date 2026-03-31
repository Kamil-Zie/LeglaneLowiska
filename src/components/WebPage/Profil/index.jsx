import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../NavBar';
import { useAuth } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import './pr0fil.css';
import '../WebPage.css';

// Sub-components
import ProfilSkeleton from './ProfilSkeleton';
import ProfilCard from './ProfilCard';
import ProfilStats from './ProfilStats';
import FriendsPreview from './FriendsPreview';
import UserPosts from './UserPosts';
import EditProfileDialog from './EditProfileDialog';

const Profil = () => {
  const { id } = useParams();
  const { user, updateUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  
  const displayId = id || user?._id;
  const isOwner = displayId === user?._id;

  const [editData, setEditData] = useState({
    nazwa: '',
    email: '',
    miasto: '',
    opis: '',
    nrKartyPZW: '',
    lokalizacja: ''
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const userRes = await axios.get(`/users/${displayId}`);
      setUserData(userRes.data.user);
      
      const postsRes = await axios.get('/portal/posts');
      const filteredPosts = postsRes.data.posts.filter(p => 
        (p.uzytkownik?._id === displayId) || (p.uzytkownik === displayId)
      );
      setUserPosts(filteredPosts);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [displayId]);

  const handleEditOpen = () => {
    setEditData({
      nazwa: userData.nazwa || '',
      email: userData.email || '',
      miasto: userData.miasto || '',
      opis: userData.opis || '',
      nrKartyPZW: userData.nrKartyPZW || '',
      lokalizacja: userData.lokalizacja || ''
    });
    setEditOpen(true);
  };

  const handleEditClose = () => setEditOpen(false);

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`/users/update/${user._id}`, editData);
      setUserData(response.data.user);
      updateUser(response.data.user);
      handleEditClose();
    } catch (err) {
      alert('Błąd podczas aktualizacji danych: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten post?")) return;
    try {
      await axios.delete(`/portal/delete/${postId}`);
      setUserPosts(userPosts.filter(p => p._id !== postId));
    } catch (err) {
      alert('Błąd podczas usuwania posta: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div className="web-page-container">
        {isLoading ? (
          <ProfilSkeleton />
        ) : (
          <div className="profil-wrapper">
            <ProfilCard 
              userData={userData} 
              onEdit={handleEditOpen} 
              isOwner={isOwner} 
            />
            
            <div className="badge-list">
              <span className="skill-badge">PZW Member</span>
            </div>

            <ProfilStats 
              userPosts={userPosts} 
              userData={userData} 
            />

            <FriendsPreview 
              userData={userData} 
              isOwner={isOwner} 
            />

            <UserPosts 
              userPosts={userPosts} 
              isOwner={isOwner} 
              userData={userData} 
              onDeletePost={handleDeletePost} 
            />
          </div>
        )}
      </div>

      {isOwner && (
        <EditProfileDialog 
          open={editOpen} 
          onClose={handleEditClose} 
          editData={editData} 
          setEditData={setEditData} 
          onSave={handleUpdateUser} 
        />
      )}
    </>
  );
};

export default Profil;