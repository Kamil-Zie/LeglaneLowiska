import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import axios from '../../../api/axios';

// Sub-components
import PostDialog from './PostDialog';
import PortalDesktop from './desktop';
import PortalMobile from './mobile';

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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    postId: null
  });

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

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
      setSnackbar({ open: true, message: 'Post dodany pomyślnie!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Błąd dodawania postu.', severity: 'error' });
    }
  };

  const handleUpdatePost = async () => {
    try {
      const response = await axios.put(`/portal/update/edit/${editingPost._id}`, newPost);
      setPosts(posts.map(p => p._id === editingPost._id ? response.data.post : p));
      handleEditClose();
      setSnackbar({ open: true, message: 'Post zaktualizowany!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Błąd aktualizacji postu.', severity: 'error' });
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

  const handleDeleteClick = (postId) => {
    setConfirmDialog({ open: true, postId });
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/portal/delete/${confirmDialog.postId}`);
      setPosts(posts.filter(p => p._id !== confirmDialog.postId));
      setConfirmDialog({ open: false, postId: null });
      setSnackbar({ open: true, message: 'Post został usunięty.', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Wystąpił problem przy usuwaniu postu.', severity: 'error' });
    }
  };

  const handleAddFriend = async (targetId) => {
    try {
      await axios.post(`/friends/request/${targetId}`);
      setSnackbar({ open: true, message: 'Zaproszenie wysłane!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Nie udało się wysłać zaproszenia.', severity: 'error' });
    }
  };


  return (
    <div className="bg-surface font-body text-on-surface min-h-screen transition-colors duration-300">
      <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- DESKTOP LAYOUT (md and up) --- */}
      <div className="hidden md:flex flex-col min-h-screen">
        <PortalDesktop 
          posts={posts} 
          handleAddFriend={handleAddFriend} 
          handleEditOpen={handleEditOpen} 
          handleDeleteClick={handleDeleteClick} 
          handleComment={handleComment} 
          handleLike={handleLike} 
          handleOpen={handleLike} 
          isLoading={isLoading}/>
      </div>

      {/* --- MOBILE LAYOUT (less than md) --- */}
      <div className="md:hidden flex flex-col min-h-screen pb-24">
        <PortalMobile 
          posts={posts} 
          handleAddFriend={handleAddFriend} 
          handleEditOpen={handleEditOpen} 
          handleDeleteClick={handleDeleteClick} 
          handleComment={handleComment} 
          handleLike={handleLike} 
          handleOpen={handleLike} 
          isLoading={isLoading}/>
      </div>

      {/* Shared Dialogs & Snackbar */}
      <PostDialog open={open} onClose={handleClose} postData={newPost} setPostData={setNewPost} onSave={handleCreatePost} mode="create" onImageChange={handleImageChange} />
      <PostDialog open={editOpen} onClose={handleEditClose} postData={newPost} setPostData={setNewPost} onSave={handleUpdatePost} mode="edit" onImageChange={handleImageChange} />
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, postId: null })} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 900, color: 'error.main' }}>Usunąć post?</DialogTitle>
        <DialogContent><DialogContentText sx={{ color: 'text.primary', fontWeight: 500 }}>Czy na pewno chcesz usunąć ten post?</DialogContentText></DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setConfirmDialog({ open: false, postId: null })} color="inherit">Anuluj</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Usuń</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} className="rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl">{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default Portal;
