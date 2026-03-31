import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  Divider,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useAuth } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import Navbar from '../NavBar';

const Portal = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
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
    try {
      const response = await axios.get('/portal/posts');
      setPosts(response.data.posts);
    } catch (err) {
      console.error('Błąd podczas pobierania postów:', err);
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
          {posts.map((post) => (
            <PostCard 
              key={post._id} 
              post={post} 
              currentUser={user} 
              onLike={() => handleLike(post._id)}
              onComment={(tekst) => handleComment(post._id, tekst)}
              onDelete={() => handleDelete(post._id)}
              onEdit={() => handleEditOpen(post)}
            />
          ))}
        </Stack>
      </Container>

      {/* Add Post Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Stwórz post</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField 
              label="Gatunek ryby" 
              fullWidth 
              value={newPost.ryba} 
              onChange={(e) => setNewPost({ ...newPost, ryba: e.target.value })} 
            />
            <Stack direction="row" spacing={2}>
              <TextField 
                label="Długość (cm)" 
                type="number" 
                fullWidth 
                value={newPost.rozmiar} 
                onChange={(e) => setNewPost({ ...newPost, rozmiar: e.target.value })} 
              />
              <TextField 
                label="Waga (kg)" 
                type="number" 
                fullWidth 
                value={newPost.waga} 
                onChange={(e) => setNewPost({ ...newPost, waga: e.target.value })} 
              />
            </Stack>
            <TextField 
              label="Miejsce połowu" 
              fullWidth 
              value={newPost.miejsce} 
              onChange={(e) => setNewPost({ ...newPost, miejsce: e.target.value })} 
            />
            <TextField 
              label="Opis (opcjonalnie)" 
              multiline 
              rows={3} 
              fullWidth 
              value={newPost.opis} 
              onChange={(e) => setNewPost({ ...newPost, opis: e.target.value })} 
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCamera />}
                sx={{ borderRadius: 2 }}
              >
                Dodaj zdjęcie
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {newPost.zdjecie && (
                <Typography variant="caption" color="success.main">Zdjęcie wybrane!</Typography>
              )}
            </Box>
            {newPost.zdjecie && (
              <Box 
                component="img" 
                src={newPost.zdjecie} 
                sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 2 }} 
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">Anuluj</Button>
          <Button 
            variant="contained" 
            onClick={handleCreatePost}
            disabled={!newPost.ryba || !newPost.rozmiar || !newPost.waga || !newPost.miejsce}
          >
            Opublikuj
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Edytuj post</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField 
              label="Gatunek ryby" 
              fullWidth 
              value={newPost.ryba} 
              onChange={(e) => setNewPost({ ...newPost, ryba: e.target.value })} 
            />
            <Stack direction="row" spacing={2}>
              <TextField 
                label="Długość (cm)" 
                type="number" 
                fullWidth 
                value={newPost.rozmiar} 
                onChange={(e) => setNewPost({ ...newPost, rozmiar: e.target.value })} 
              />
              <TextField 
                label="Waga (kg)" 
                type="number" 
                fullWidth 
                value={newPost.waga} 
                onChange={(e) => setNewPost({ ...newPost, waga: e.target.value })} 
              />
            </Stack>
            <TextField 
              label="Miejsce połowu" 
              fullWidth 
              value={newPost.miejsce} 
              onChange={(e) => setNewPost({ ...newPost, miejsce: e.target.value })} 
            />
            <TextField 
              label="Opis" 
              multiline 
              rows={3} 
              fullWidth 
              value={newPost.opis} 
              onChange={(e) => setNewPost({ ...newPost, opis: e.target.value })} 
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCamera />}
                sx={{ borderRadius: 2 }}
              >
                Zmień zdjęcie
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {newPost.zdjecie && (
                <Button color="error" size="small" onClick={() => setNewPost({ ...newPost, zdjecie: '' })}>
                  Usuń zdjęcie
                </Button>
              )}
            </Box>
            {newPost.zdjecie && (
              <Box 
                component="img" 
                src={newPost.zdjecie} 
                sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 2 }} 
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleEditClose} color="inherit">Anuluj</Button>
          <Button 
            variant="contained" 
            onClick={handleUpdatePost}
            disabled={!newPost.ryba || !newPost.rozmiar || !newPost.waga || !newPost.miejsce}
          >
            Zapisz zmiany
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const PostCard = ({ post, currentUser, onLike, onComment, onDelete, onEdit }) => {
  const [commentText, setCommentText] = useState('');
  const isLiked = post.polubienia.includes(currentUser._id);
  const isOwner = post.uzytkownik?._id === currentUser._id;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{post.uzytkownik?.nazwa[0]}</Avatar>}
        title={<Typography fontWeight="bold">{post.uzytkownik?.nazwa}</Typography>}
        subheader={new Date(post.createdAt).toLocaleString()}
        action={
          isOwner && (
            <Stack direction="row" spacing={0.5}>
              <IconButton onClick={onEdit} color="primary" size="small">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={onDelete} color="error" size="small">
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>
          )
        }
      />
      <CardContent>
        {post.zdjecie && (
          <Box 
            component="img" 
            src={post.zdjecie} 
            sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 2, mb: 2 }} 
          />
        )}
        <Typography variant="body1" sx={{ mb: 2 }}>
          Złowiono: <strong>{post.ryba}</strong>
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={`${post.rozmiar} cm`} color="primary" variant="outlined" />
          <Chip label={`${post.waga} kg`} color="secondary" variant="outlined" />
          <Chip label={post.miejsce} color="default" variant="outlined" />
        </Stack>

        {post.opis && (
          <Typography variant="body2" color="text.secondary">
            {post.opis}
          </Typography>
        )}
      </CardContent>

      <Divider sx={{ mx: 2 }} />
      
      <CardActions sx={{ px: 2, justifyContent: 'space-around' }}>
        <Button 
          startIcon={isLiked ? <FavoriteIcon sx={{ color: '#e0245e' }} /> : <FavoriteBorderIcon />}
          onClick={onLike}
          fullWidth
          sx={{ color: isLiked ? '#e0245e' : 'inherit' }}
        >
          {post.polubienia.length > 0 && post.polubienia.length} {isLiked ? 'Lubisz to' : 'Lubię to'}
        </Button>
        <Button 
          startIcon={<ChatBubbleOutlineIcon />}
          fullWidth
          color="inherit"
        >
          Komentarze ({post.komentarze.length})
        </Button>
      </CardActions>

      <Divider sx={{ mx: 2 }} />

      {/* Comments List */}
      <Box sx={{ p: 2, backgroundColor: '#fafafa' }}>
        <Stack spacing={1.5}>
          {post.komentarze.map((comment, idx) => (
            <Box key={idx} sx={{ display: 'flex', gap: 1 }}>
              <Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem' }}>
                {comment.uzytkownik?.nazwa[0]}
              </Avatar>
              <Box sx={{ backgroundColor: '#f0f2f5', p: 1, borderRadius: 2, flexGrow: 1 }}>
                <Typography variant="caption" fontWeight="bold">
                  {comment.uzytkownik?.nazwa}
                </Typography>
                <Typography variant="body2">{comment.tekst}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Comment Input */}
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Napisz komentarz..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            sx={{ backgroundColor: '#f0f2f5', '& fieldset': { border: 'none' }, borderRadius: 5 }}
          />
          <IconButton 
            color="primary" 
            onClick={() => {
              onComment(commentText);
              setCommentText('');
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>
    </Card>
  );
};

export default Portal;