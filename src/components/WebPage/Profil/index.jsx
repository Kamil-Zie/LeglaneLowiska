import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../NavBar';
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
      setSnackbar({ open: true, message: 'Twój profil został zaktualizowany!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Nie udało się zapisać zmian. Spróbuj ponownie.', severity: 'error' });
    }
  };

  const handleDeleteClick = (postId) => {
    setConfirmDialog({ open: true, postId });
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/portal/delete/${confirmDialog.postId}`);
      setUserPosts(userPosts.filter(p => p._id !== confirmDialog.postId));
      setConfirmDialog({ open: false, postId: null });
      setSnackbar({ open: true, message: 'Post został usunięty.', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Wystąpił problem przy usuwaniu postu.', severity: 'error' });
    }
  };

  return (
    <div className="bg-surface dark:bg-slate-950 font-body text-on-surface min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-8">
        {isLoading ? (
          <ProfilSkeleton />
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Top Profile Card with Banner */}
            <ProfilCard 
              userData={userData} 
              onEdit={handleEditOpen} 
              isOwner={isOwner} 
            />
            
            {/* Horizontal Stats Section */}
            <ProfilStats 
              userPosts={userPosts} 
              userData={userData} 
            />

            {/* Friends Grid Section */}
            <FriendsPreview 
              userData={userData} 
              isOwner={isOwner} 
            />

            {/* User Activity / Posts Feed */}
            <UserPosts 
              userPosts={userPosts} 
              isOwner={isOwner} 
              userData={userData} 
              onDeletePost={handleDeleteClick} 
            />
          </div>
        )}
      </main>

      {isOwner && (
        <EditProfileDialog 
          open={editOpen} 
          onClose={handleEditClose} 
          editData={editData} 
          setEditData={setEditData} 
          onSave={handleUpdateUser} 
        />
      )}

      {/* Confirmation Dialog */}
      <Dialog 
        open={confirmDialog.open} 
        onClose={() => setConfirmDialog({ open: false, postId: null })}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 900, color: 'error.main' }}>Usunąć post?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.primary', fontWeight: 500 }}>
            Czy na pewno chcesz usunąć ten post? Tej operacji nie można cofnąć.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setConfirmDialog({ open: false, postId: null })} color="inherit" sx={{ fontWeight: 700 }}>Anuluj</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" sx={{ fontWeight: 700, borderRadius: 2 }}>Usuń bezpowrotnie</Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2, fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profil;
