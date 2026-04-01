import React, { useState, useEffect } from 'react';
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
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import Navbar from '../NavBar';

// Sub-components
import PostSkeleton from './PostSkeleton';
import PostCard from './PostCard';
import PostDialog from './PostDialog';

const Portal = () => {
  const { user } = useAuth();
  const location = useLocation();
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

  const isActive = (path) => location.pathname === path;

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
        <Navbar />
        <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-8">
          <div className="grid grid-cols-12 gap-8 text-left">
            <aside className="col-span-3 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 p-8 shadow-sm sticky top-24">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary mb-6 border-4 border-solid border-white dark:border-slate-800 shadow-xl overflow-hidden">
                    {user.zdjecie ? <img src={user.zdjecie} className="w-full h-full object-cover" alt="me" /> : <span className="text-3xl font-black">{user.nazwa[0]}</span>}
                  </div>
                  <h2 className="text-xl font-black text-on-surface dark:text-slate-100 mb-1">{user.imie} {user.nazwisko}</h2>
                  <p className="text-xs text-primary font-bold uppercase tracking-widest mb-6">@{user.nazwa}</p>
                  <div className="grid grid-cols-3 w-full border-0 border-t border-solid border-slate-100 dark:border-slate-800 pt-6">
                    <div><div className="text-lg font-black text-primary">{user.friends?.length || 0}</div><div className="text-[10px] text-outline uppercase font-bold">Znajomi</div></div>
                    <div><div className="text-lg font-black text-primary">{posts.filter(p => p.uzytkownik?._id === user._id).length}</div><div className="text-[10px] text-outline uppercase font-bold">Posty</div></div>
                    <div><div className="text-lg font-black text-primary">{user.ulubioneLowiska?.length || 0}</div><div className="text-[10px] text-outline uppercase font-bold">Ulubione</div></div>
                  </div>
                </div>
              </div>
            </aside>
            <div className="col-span-6 space-y-8">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center text-primary font-black overflow-hidden border-2 border-solid border-white shadow-sm">
                    {user.zdjecie ? <img src={user.zdjecie} className="w-full h-full object-cover" alt="me" /> : user.nazwa[0]}
                  </div>
                  <button onClick={handleOpen} className="flex-grow bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high text-left px-6 py-4 rounded-2xl text-on-surface-variant text-sm font-bold border-none cursor-pointer">
                    Co u Ciebie, {user.imie}?
                  </button>
                </div>
              </div>
              <div className="space-y-8">
                {isLoading ? [1, 2].map(i => <PostSkeleton key={i} />) : posts.map(post => <PostCard key={post._id} post={post} currentUser={user} onLike={() => handleLike(post._id)} onComment={(tekst) => handleComment(post._id, tekst)} onDelete={() => handleDeleteClick(post._id)} onEdit={() => handleEditOpen(post)} onAddFriend={() => handleAddFriend(post.uzytkownik?._id)} />)}
              </div>
            </div>
            <aside className="col-span-3 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-solid border-outline-variant p-8 shadow-sm">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-6">Popularne gatunki</h3>
                <div className="space-y-4">
                  {[{ name: 'Szczupak', count: 124 }, { name: 'Okoń', count: 89 }].map((item, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                      <span className="text-sm font-bold">#{item.name}</span>
                      <span className="text-[10px] font-black bg-slate-100 px-2.5 py-1 rounded-lg">+{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* --- MOBILE LAYOUT (less than md) --- */}
      <div className="md:hidden flex flex-col min-h-screen pb-24">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center px-4 h-16 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-700">anchor</span>
              <h1 className="text-xl font-black text-sky-800 dark:text-sky-300 m-0 leading-none">Wędkarz Portal</h1>
            </div>
            <Link to="/profil">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
            </Link>
          </div>
        </header>

        <main className="flex-grow pt-20 px-4 space-y-8 max-w-2xl mx-auto w-full text-left">
          <section>
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0 flex items-center justify-center text-primary font-black overflow-hidden border-2 border-solid border-white">
                  {user.zdjecie ? <img src={user.zdjecie} className="w-full h-full object-cover" alt="me" /> : user.nazwa[0]}
                </div>
                <button onClick={handleOpen} className="flex-grow bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high text-left px-6 py-4 rounded-2xl text-on-surface-variant text-sm font-bold border-none cursor-pointer">
                  Co u Ciebie, {user.imie}?
                </button>
              </div>
            </div>
          </section>
          <section className="space-y-8">
            {isLoading ? [1, 2].map(i => <PostSkeleton key={i} />) : posts.map(post => <PostCard key={post._id} post={post} currentUser={user} onLike={() => handleLike(post._id)} onComment={(tekst) => handleComment(post._id, tekst)} onDelete={() => handleDeleteClick(post._id)} onEdit={() => handleEditOpen(post)} onAddFriend={() => handleAddFriend(post.uzytkownik?._id)} />)}
          </section>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-1px_3px_0_rgba(0,0,0,0.05)]">
          <div className="flex justify-around items-center px-2 py-3 pb-safe max-w-2xl mx-auto">
            <Link to="/webpage" className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 no-underline ${isActive('/webpage') ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700' : 'text-slate-500'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/webpage') ? "'FILL' 1" : "'FILL' 0" }}>home</span>
              <span className="text-[11px] font-semibold tracking-tight">Start</span>
            </Link>
            <Link to="/portal" className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 no-underline ${isActive('/portal') ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700' : 'text-slate-500'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/portal') ? "'FILL' 1" : "'FILL' 0" }}>groups</span>
              <span className="text-[11px] font-semibold tracking-tight">Portal</span>
            </Link>
            <Link to="/mapy" className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 no-underline ${isActive('/mapy') ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700' : 'text-slate-500'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/mapy') ? "'FILL' 1" : "'FILL' 0" }}>map</span>
              <span className="text-[11px] font-semibold tracking-tight">Mapa</span>
            </Link>
            <Link to="/kup-licencje" className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 no-underline ${isActive('/kup-licencje') ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700' : 'text-slate-500'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/kup-licencje') ? "'FILL' 1" : "'FILL' 0" }}>description</span>
              <span className="text-[11px] font-semibold tracking-tight">Licencje</span>
            </Link>
            <Link to="/profil" className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 no-underline ${isActive('/profil') ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700' : 'text-slate-500'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/profil') ? "'FILL' 1" : "'FILL' 0" }}>person</span>
              <span className="text-[11px] font-semibold tracking-tight">Profil</span>
            </Link>
          </div>
        </nav>
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
