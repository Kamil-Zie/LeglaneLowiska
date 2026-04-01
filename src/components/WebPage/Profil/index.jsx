import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Navbar from '../NavBar';
import MobileNav from '../MobileNav';
import { useAuth } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import { Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

// Sub-components
import ProfilSkeleton from './ProfilSkeleton';
import ProfilCard from './ProfilCard';
import ProfilStats from './ProfilStats';
import FriendsPreview from './FriendsPreview';
import UserPosts from './UserPosts';
import EditProfileDialog from './EditProfileDialog';
import LowiskoCard from '../LowiskoCard';

const Profil = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user, updateUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [favoriteLowiska, setFavoriteLowiska] = useState([]);
  const [okregi, setOkregi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  
  const displayId = id || user?._id;
  const isOwner = displayId === user?._id;

  const [editData, setEditData] = useState({
    nazwa: '', email: '', miasto: '', opis: '', nrKartyPZW: '', lokalizacja: ''
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, postId: null });

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [userRes, postsRes] = await Promise.all([
        axios.get(`/users/${displayId}`),
        axios.get('/portal/posts')
      ]);
      const fetchedUser = userRes.data.user;
      setUserData(fetchedUser);
      setUserPosts(postsRes.data.posts.filter(p => (p.uzytkownik?._id === displayId) || (p.uzytkownik === displayId)));
      const allLowiska = JSON.parse(localStorage.getItem('lowiska')) || [];
      setOkregi(JSON.parse(localStorage.getItem('okregi')) || []);
      if (fetchedUser?.ulubioneLowiska) {
        setFavoriteLowiska(allLowiska.filter(l => fetchedUser.ulubioneLowiska.includes(l._id)));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [displayId]);

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
      setSnackbar({ open: true, message: 'Profil zaktualizowany!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Błąd zapisu.', severity: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/portal/delete/${confirmDialog.postId}`);
      setUserPosts(userPosts.filter(p => p._id !== confirmDialog.postId));
      setConfirmDialog({ open: false, postId: null });
      setSnackbar({ open: true, message: 'Post usunięty.', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Błąd usuwania.', severity: 'error' });
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

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:flex flex-col min-h-screen">
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
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex flex-col min-h-screen pb-24 text-left">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 shadow-sm">
          <div className="flex justify-between items-center px-4 h-16 max-w-2xl mx-auto">
            <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sky-700">anchor</span><h1 className="text-xl font-black text-sky-800 m-0">Profil</h1></div>
          </div>
        </header>
        <main className="flex-grow pt-20 px-4 space-y-10 max-w-2xl mx-auto w-full">
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
      </div>

      {isOwner && <EditProfileDialog open={editOpen} onClose={handleEditClose} editData={editData} setEditData={setEditData} onSave={handleUpdateUser} />}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, postId: null })} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 900, color: 'error.main' }}>Usunąć post?</DialogTitle>
        <DialogContent><DialogContentText>Czy na pewno chcesz usunąć ten post?</DialogContentText></DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setConfirmDialog({ open: false, postId: null })} color="inherit">Anuluj</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Usuń</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}><Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ borderRadius: 2 }}>{snackbar.message}</Alert></Snackbar>
    </div>
  );
};

export default Profil;
