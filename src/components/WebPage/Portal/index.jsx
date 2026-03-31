import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  Stack,
} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import Navbar from '../NavBar';

// Sub-components
import PostSkeleton from './PostSkeleton';
import PostCard from './PostCard';
import PostDialog from './PostDialog';

const Portal = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({
    ryba: '',
    rozmiar: '',
    waga: '',
    miejsce: '',
    opis: '',
    zdjecie: '',
  });

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/portal/posts');
      setPosts(response.data.posts);
    } catch (err) {
      console.error('Błąd podczas pobierania postów:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewPost({ ryba: '', rozmiar: '', waga: '', miejsce: '', opis: '', zdjecie: '' });
  };

  const handleEditOpen = (post) => {
    setEditingPost(post);
    setNewPost({
      ryba: post.ryba,
      rozmiar: post.rozmiar,
      waga: post.waga,
      miejsce: post.miejsce,
      opis: post.opis || '',
      zdjecie: post.zdjecie || '',
    });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingPost(null);
    setNewPost({ ryba: '', rozmiar: '', waga: '', miejsce: '', opis: '', zdjecie: '' });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({ ...newPost, zdjecie: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async () => {
    try {
      await axios.post('/portal/create', {
        ...newPost,
        uzytkownik: user._id,
      });
      handleClose();
      fetchPosts();
    } catch (err) {
      alert('Błąd podczas dodawania posta: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleUpdatePost = async () => {
    try {
      const response = await axios.put(`/portal/update/edit/${editingPost._id}`, newPost);
      setPosts(posts.map(p => p._id === editingPost._id ? response.data.post : p));
      handleEditClose();
    } catch (err) {
      alert('Błąd podczas edycji posta: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(`/portal/update/like/${postId}`, {
        uzytkownikId: user._id,
      });
      setPosts(posts.map(p => p._id === postId ? { ...p, polubienia: response.data.post.polubienia } : p));
    } catch (err) {
      console.error('Błąd polubienia:', err);
    }
  };

  const handleComment = async (postId, tekst) => {
    if (!tekst) return;
    try {
      const response = await axios.put(`/portal/update/comment/${postId}`, {
        uzytkownikId: user._id,
        tekst,
      });
      setPosts(posts.map(p => p._id === postId ? response.data.post : p));
    } catch (err) {
      console.error('Błąd komentowania:', err);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten post?")) return;
    try {
      await axios.delete(`/portal/delete/${postId}`);
      setPosts(posts.filter(p => p._id !== postId));
    } catch (err) {
      alert('Błąd podczas usuwania posta: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleAddFriend = async (targetId) => {
    try {
      await axios.post(`/friends/request/${targetId}`);
      alert('Zaproszenie wysłane!');
    } catch (err) {
      alert(err.response?.data?.message || 'Błąd wysyłania zaproszenia');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', pb: 4 }}>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Add Post Trigger */}
        <Paper 
          sx={{ 
            p: 2, 
            mb: 3, 
            borderRadius: 3, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main' }}>{user.nazwa[0]}</Avatar>
          <Button 
            fullWidth 
            variant="outlined" 
            onClick={handleOpen}
            sx={{ 
              justifyContent: 'flex-start', 
              borderRadius: 5, 
              backgroundColor: '#f0f2f5',
              border: 'none',
              color: 'text.secondary',
              '&:hover': { backgroundColor: '#e4e6e9', border: 'none' }
            }}
          >
            Pochwal się swoim połowem, {user.nazwa}...
          </Button>
        </Paper>

        {/* Feed */}
        <Stack spacing={3}>
          {isLoading ? (
            [1, 2, 3].map((i) => <PostSkeleton key={i} />)
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard 
                key={post._id} 
                post={post} 
                currentUser={user} 
                onLike={() => handleLike(post._id)}
                onComment={(tekst) => handleComment(post._id, tekst)}
                onDelete={() => handleDelete(post._id)}
                onEdit={() => handleEditOpen(post)}
                onAddFriend={() => handleAddFriend(post.uzytkownik?._id)}
              />
            ))
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
              <Typography color="text.secondary">Brak postów do wyświetlenia. Bądź pierwszy!</Typography>
            </Paper>
          )}
        </Stack>
      </Container>

      {/* Create Post Dialog */}
      <PostDialog 
        open={open} 
        onClose={handleClose} 
        postData={newPost} 
        setPostData={setNewPost} 
        onSave={handleCreatePost} 
        mode="create"
        onImageChange={handleImageChange}
      />

      {/* Edit Post Dialog */}
      <PostDialog 
        open={editOpen} 
        onClose={handleEditClose} 
        postData={newPost} 
        setPostData={setNewPost} 
        onSave={handleUpdatePost} 
        mode="edit"
        onImageChange={handleImageChange}
      />
    </Box>
  );
};

export default Portal;