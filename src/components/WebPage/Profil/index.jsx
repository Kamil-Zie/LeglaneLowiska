import React, { useState, useEffect } from 'react';
import './pr0fil.css';
import Navbar from '../NavBar';
import { useAuth } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import '../WebPage.css';
import Avatar from '@mui/material/Avatar';
import { Box, Skeleton, Typography, Paper, Divider, Stack, IconButton, Chip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ProfilSkeleton = () => (
  <div className="profil-wrapper">
    <div className="profil-card">

      <div className="profil-header">
        <div className="avatar-placeholder">
          <Skeleton variant="circular" width={150} height={150} />
        </div>
      </div>

      <div className="profil-name">
        <Skeleton variant="text" width={180} height={40} sx={{ mx: 'auto' }} />
      </div>

      <div className="profil-description">
        <Skeleton variant="text" width={280} height={22} sx={{ mx: 'auto' }} />
        <Skeleton variant="text" width={220} height={22} sx={{ mx: 'auto' }} />
      </div>

      <div className="profil-body">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="info-item" key={i}>
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={160} height={20} sx={{ ml: 1 }} />
          </div>
        ))}
      </div>
    </div>

    <div className="badge-list">
      <Skeleton variant="rounded" width={110} height={36} sx={{ borderRadius: '50px' }} />
    </div>

    <section className="stats-grid">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="stat-box" key={i}>
          <Skeleton variant="text" width={60} height={32} />
          <Skeleton variant="text" width={50} height={18} />
        </div>
      ))}
    </section>
  </div>
);

const ProfilContent = ({ userData, userPosts, onDeletePost }) => {
  const recordPost = userPosts.length > 0 
    ? userPosts.reduce((prev, current) => (parseFloat(prev.waga) > parseFloat(current.waga)) ? prev : current)
    : null;

  return (
    <div className="profil-wrapper">
      <div className="profil-card">
        <div className="profil-header">
          <div className="avatar-placeholder">
            <Avatar sx={{ bgcolor: '#1a5275', width: 150, height: 150, fontSize: 60 }}>
              {userData?.nazwa?.charAt(0) || 'B'}
            </Avatar>
          </div>
        </div>
        <div className="profil-name">
          <h2>{userData?.nazwa || 'Brak nazwy'}</h2>
        </div>
        <div className="profil-description">
          <p>{userData?.opis || 'Brak opisu'}</p>
        </div>
        <div className="profil-body">
          <div className="info-item">
            <span className="info-label"><b>Email: </b></span>
            <span className="info-value">{userData?.email || 'Brak danych'}</span>
          </div>
          <div className="info-item">
            <span className="info-label"><b>Nr Karty PZW: </b></span>
            <span className="info-value">{userData?.nrKartyPZW || 'Brak danych'}</span>
          </div>
          <div className="info-item">
            <span className="info-label"><b>Moje Punkty: </b></span>
            <span className="info-value">⭐ {userData?.punkty || 0} pkt</span>
          </div>
          <div className="info-item">
            <span className="info-label"><b>Lokalizacja: </b></span>
            <span className="info-value">{userData?.lokalizacja || 'Brak danych'}</span>
          </div>
        </div>
      </div>

      <div className="badge-list">
        <span className="skill-badge">PZW Member</span>
      </div>

      <section className="stats-grid">
        <div className="stat-box">
          <span className="stat-value">{userPosts.length}</span>
          <span className="stat-label">Wpisy</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">
            {recordPost ? `${recordPost.waga} kg` : 'Brak'}
          </span>
          <span className="stat-label" style={{ textAlign: 'center' }}>
            {recordPost ? `${recordPost.ryba} (${recordPost.rozmiar} cm)` : 'Rekord'}
          </span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{userData?.ulubioneLowiska?.length || 0}</span>
          <span className="stat-label">Ulubione</span>
        </div>
      </section>

    <Box sx={{ mt: 4, width: '100%', maxWidth: '800px', mx: 'auto', pb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#1a5275', textAlign: 'center' }}>
        Moje Połowy
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      {userPosts.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <Typography color="text.secondary">Nie masz jeszcze żadnych wpisów na portalu.</Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {userPosts.map((post) => (
            <Paper key={post._id} sx={{ p: 2, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{post.ryba}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <IconButton color="error" size="small" onClick={() => onDeletePost(post._id)}>
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Stack>
              
              {post.zdjecie && (
                <Box 
                  sx={{ 
                    width: '100%', 
                    maxHeight: 400, 
                    borderRadius: 2, 
                    my: 1, 
                    overflow: 'hidden',
                    backgroundColor: '#f0f2f5',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box 
                    component="img" 
                    src={post.zdjecie} 
                    sx={{ 
                      maxWidth: '100%', 
                      maxHeight: 400, 
                      objectFit: 'contain'
                    }} 
                  />
                </Box>
              )}
              
              <Stack direction="row" spacing={1} sx={{ my: 1.5 }}>
                <Chip label={`${post.rozmiar} cm`} size="small" variant="outlined" color="primary" />
                <Chip label={`${post.waga} kg`} size="small" variant="outlined" color="secondary" />
                <Chip label={post.miejsce} size="small" variant="outlined" />
              </Stack>
              
              {post.opis && (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  "{post.opis}"
                </Typography>
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  </div>
  );
};

const Profil = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Fetch User Info
      const userRes = await axios.get(`/users/${user._id}`);
      setUserData(userRes.data.user);

      // Fetch All Posts and filter for the user
      // Ideally, the backend would have a /portal/posts/user/:id endpoint, 
      // but for now we filter the existing list.
      const postsRes = await axios.get('/portal/posts');
      const filteredPosts = postsRes.data.posts.filter(p => 
        (p.uzytkownik?._id === user._id) || (p.uzytkownik === user._id)
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
  }, [user._id]);

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
          <ProfilContent 
            userData={userData} 
            userPosts={userPosts} 
            onDeletePost={handleDeletePost}
          />
        )}
      </div>
    </>
  );
};

export default Profil;
