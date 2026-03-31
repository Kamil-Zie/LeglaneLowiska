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

  return (
    <div className="bg-surface dark:bg-slate-950 font-body text-on-surface min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Quick Stats */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 p-8 shadow-sm sticky top-24">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary mb-6 border-4 border-solid border-white dark:border-slate-800 shadow-xl overflow-hidden">
                  {user.zdjecie ? (
                    <img src={user.zdjecie} className="w-full h-full object-cover" alt="me" />
                  ) : (
                    <span className="text-3xl font-black">{user.nazwa[0]}</span>
                  )}
                </div>
                <h2 className="text-xl font-black text-on-surface dark:text-slate-100 mb-1">{user.imie} {user.nazwisko}</h2>
                <p className="text-xs text-primary font-bold uppercase tracking-widest mb-6">@{user.nazwa}</p>
                
                <div className="grid grid-cols-3 w-full border-0 border-t border-solid border-slate-100 dark:border-slate-800 pt-6">
                  <div>
                    <div className="text-lg font-black text-primary dark:text-sky-400">{user.friends?.length || 0}</div>
                    <div className="text-[10px] text-outline font-bold uppercase tracking-tighter">Znajomi</div>
                  </div>
                  <div className="border-0 border-x border-solid border-slate-100 dark:border-slate-800">
                    <div className="text-lg font-black text-primary dark:text-sky-400">{posts.filter(p => p.uzytkownik?._id === user._id).length}</div>
                    <div className="text-[10px] text-outline font-bold uppercase tracking-tighter">Posty</div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-primary dark:text-sky-400">{user.ulubioneLowiska?.length || 0}</div>
                    <div className="text-[10px] text-outline font-bold uppercase tracking-tighter">Ulubione</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-container/10 dark:bg-primary-container/5 p-8 rounded-[2rem] border border-solid border-primary-container/20 dark:border-primary-container/10">
              <h4 className="text-xs font-black text-primary dark:text-sky-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">tips_and_updates</span>
                Wskazówka
              </h4>
              <p className="text-sm text-on-surface-variant dark:text-slate-400 leading-relaxed italic m-0">
                "Pamiętaj o zachowaniu czystości nad wodą. Twoje dzieci też będą chciały tam wędkować!"
              </p>
            </div>
          </aside>

          {/* Center Column: Feed */}
          <div className="lg:col-span-6 space-y-8">
            {/* Create Post Header */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center text-primary font-black overflow-hidden border-2 border-solid border-white dark:border-slate-700 shadow-sm">
                  {user.zdjecie ? <img src={user.zdjecie} className="w-full h-full object-cover" alt="me" /> : user.nazwa[0]}
                </div>
                <button 
                  onClick={handleOpen}
                  className="flex-grow bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors text-left px-6 py-4 rounded-2xl text-on-surface-variant dark:text-slate-400 text-sm font-bold border-none cursor-pointer"
                >
                  Pochwal się swoim połowem, {user.imie}...
                </button>
              </div>
              <div className="flex gap-6 mt-6 pt-6 border-0 border-t border-solid border-slate-50 dark:border-slate-800/50">
                <button onClick={handleOpen} className="flex items-center gap-2 text-xs font-black text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors border-none bg-transparent cursor-pointer uppercase tracking-widest">
                  <span className="material-symbols-outlined text-secondary">image</span> Zdjęcie
                </button>
                <button onClick={handleOpen} className="flex items-center gap-2 text-xs font-black text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors border-none bg-transparent cursor-pointer uppercase tracking-widest">
                  <span className="material-symbols-outlined text-error">location_on</span> Miejsce
                </button>
                <button onClick={handleOpen} className="flex items-center gap-2 text-xs font-black text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-sky-400 transition-colors border-none bg-transparent cursor-pointer uppercase tracking-widest">
                  <span className="material-symbols-outlined text-primary">sell</span> Ryba
                </button>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-8">
              {isLoading ? (
                [1, 2].map((i) => <PostSkeleton key={i} />)
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard 
                    key={post._id} 
                    post={post} 
                    currentUser={user} 
                    onLike={() => handleLike(post._id)}
                    onComment={(tekst) => handleComment(post._id, tekst)}
                    onDelete={() => handleDeleteClick(post._id)}
                    onEdit={() => handleEditOpen(post)}
                    onAddFriend={() => handleAddFriend(post.uzytkownik?._id)}
                  />
                ))
              ) : (
                <div className="bg-white dark:bg-slate-900 py-20 text-center rounded-[2.5rem] border border-solid border-outline-variant dark:border-slate-800 shadow-sm">
                  <span className="material-symbols-outlined text-8xl text-slate-200 dark:text-slate-800 mb-6">phishing</span>
                  <p className="text-on-surface-variant dark:text-slate-400 font-black text-lg m-0 uppercase tracking-tighter">Brak postów do wyświetlenia</p>
                  <button 
                    onClick={handleOpen}
                    className="mt-8 bg-primary text-white px-10 py-4 rounded-2xl font-black hover:brightness-110 active:scale-95 transition-all border-none cursor-pointer uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
                  >
                    Dodaj pierwszy post
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Trending */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
             <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 p-8 shadow-sm">
              <h3 className="text-xs font-black text-primary dark:text-sky-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">trending_up</span>
                Popularne gatunki
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Szczupak', count: 124 },
                  { name: 'Okoń', count: 89 },
                  { name: 'Karp', count: 56 },
                  { name: 'Sandacz', count: 34 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-sm font-bold text-on-surface dark:text-slate-300 group-hover:text-primary dark:group-hover:text-sky-400 transition-colors">#{item.name}</span>
                    <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg text-slate-500 dark:text-slate-400">+{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-tertiary to-primary text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-3 m-0">Wyzwanie Tygodnia</h3>
                <h4 className="text-xl font-black mb-4 m-0 leading-tight">Złap największego Okonia!</h4>
                <p className="text-xs opacity-90 leading-relaxed mb-8 m-0 font-medium">Uczestnicy mają szansę wygrać roczną licencję na dowolne łowisko w okręgu.</p>
                <button className="w-full bg-white text-primary font-black py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-opacity-90 transition-all border-none cursor-pointer shadow-lg">
                  Szczegóły
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </aside>

        </div>
      </main>

      {/* Dialogs */}
      <PostDialog 
        open={open} 
        onClose={handleClose} 
        postData={newPost} 
        setPostData={setNewPost} 
        onSave={handleCreatePost} 
        mode="create"
        onImageChange={handleImageChange}
      />

      <PostDialog 
        open={editOpen} 
        onClose={handleEditClose} 
        postData={newPost} 
        setPostData={setNewPost} 
        onSave={handleUpdatePost} 
        mode="edit"
        onImageChange={handleImageChange}
      />

      <Dialog 
        open={confirmDialog.open} 
        onClose={() => setConfirmDialog({ open: false, postId: null })}
        PaperProps={{ className: 'dark:bg-slate-900 rounded-[2rem] border border-solid dark:border-slate-800 shadow-2xl' }}
      >
        <DialogTitle className="font-black text-error px-8 pt-8">Usunąć post?</DialogTitle>
        <DialogContent className="px-8">
          <DialogContentText className="dark:text-slate-400 font-medium text-sm">
            Czy na pewno chcesz usunąć ten post? Tej operacji nie można cofnąć.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-8 gap-4">
          <button onClick={() => setConfirmDialog({ open: false, postId: null })} className="flex-grow py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all border-none bg-transparent cursor-pointer">Anuluj</button>
          <button onClick={handleDeleteConfirm} className="flex-grow py-3 text-xs font-black uppercase tracking-widest bg-error text-white rounded-xl hover:brightness-110 active:scale-95 transition-all border-none cursor-pointer shadow-lg shadow-error/20">Usuń</button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} className="rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Portal;
