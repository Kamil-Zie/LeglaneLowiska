import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar';
import {
  Avatar,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import axios from '../../../api/axios';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    friendId: null
  });

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const fetchFriendsData = async () => {
    try {
      const [listRes, suggestionsRes] = await Promise.all([
        axios.get('/friends/list'),
        axios.get('/friends/suggestions')
      ]);
      setFriends(listRes.data.friends);
      setPendingRequests(listRes.data.pendingRequests);
      setSuggestions(suggestionsRes.data.suggestions);
    } catch (err) {
      console.error('Błąd podczas pobierania danych znajomych:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFriendsData();
  }, []);

  const handleSendRequest = async (targetId) => {
    try {
      await axios.post(`/friends/request/${targetId}`);
      setSuggestions(suggestions.filter(s => s._id !== targetId));
      setSnackbar({ open: true, message: 'Zaproszenie wysłane!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Nie udało się wysłać zaproszenia.', severity: 'error' });
    }
  };

  const handleAcceptRequest = async (requesterId) => {
    try {
      const response = await axios.post(`/friends/accept/${requesterId}`);
      updateUser(response.data.user);
      fetchFriendsData();
      setSnackbar({ open: true, message: 'Zaproszenie zaakceptowane!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Błąd akceptacji.', severity: 'error' });
    }
  };

  const handleDeclineRequest = async (requesterId) => {
    try {
      const response = await axios.post(`/friends/decline/${requesterId}`);
      updateUser(response.data.user);
      fetchFriendsData();
      setSnackbar({ open: true, message: 'Odrzucono zaproszenie.', severity: 'info' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Błąd odrzucania.', severity: 'error' });
    }
  };

  const handleRemoveClick = (friendId) => {
    setConfirmDialog({ open: true, friendId });
  };

  const handleRemoveConfirm = async () => {
    try {
      const response = await axios.delete(`/friends/${confirmDialog.friendId}`);
      updateUser(response.data.user);
      fetchFriendsData();
      setConfirmDialog({ open: false, friendId: null });
      setSnackbar({ open: true, message: 'Usunięto ze znajomych.', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Błąd usuwania.', severity: 'error' });
    }
  };

  const UserRow = ({ person, type }) => (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
      <div className="flex items-center gap-4">
        <div 
          className="relative cursor-pointer"
          onClick={() => navigate(`/profil/${person._id}`)}
        >
          <Avatar 
            src={person.zdjecie}
            sx={{ width: 48, height: 48, bgcolor: 'primary.main', fontWeight: 'bold' }}
          >
            {person.nazwa[0]}
          </Avatar>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-solid border-white dark:border-slate-900 rounded-full" />
        </div>
        <div>
          <h4 
            className="text-sm font-black text-on-surface dark:text-slate-200 m-0 cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigate(`/profil/${person._id}`)}
          >
            {person.nazwa}
          </h4>
          <p className="text-[10px] text-outline font-bold uppercase m-0 tracking-tighter">
            {person.miasto || person.lokalizacja || 'Wędkarz'}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {type === 'suggestion' && (
          <button 
            onClick={() => handleSendRequest(person._id)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-[10px] font-black rounded-lg hover:brightness-110 active:scale-95 transition-all border-none cursor-pointer uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            Dodaj
          </button>
        )}
        {type === 'request' && (
          <>
            <button 
              onClick={() => handleAcceptRequest(person._id)}
              className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center hover:brightness-110 active:scale-90 transition-all border-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">check</span>
            </button>
            <button 
              onClick={() => handleDeclineRequest(person._id)}
              className="w-8 h-8 rounded-full bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-white active:scale-90 transition-all border-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </>
        )}
        {type === 'friend' && (
          <button 
            onClick={() => handleRemoveClick(person._id)}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-error/10 hover:text-error active:scale-90 transition-all border-none cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">person_remove</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-surface dark:bg-slate-950 font-body text-on-surface min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Friends List */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white dark:bg-slate-900 rounded-3xl border border-solid border-outline-variant dark:border-slate-800 p-8 shadow-sm">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-3xl font-black text-primary dark:text-sky-400 tracking-tight m-0">Twoi Znajomi</h1>
                  <p className="text-on-surface-variant dark:text-slate-400 text-sm m-0">Twoja wędkarska sieć kontaktów ({friends.length})</p>
                </div>
                <div className="relative">
                   <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                   <input className="pl-10 pr-4 py-2 bg-surface-container dark:bg-slate-800 border-none rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 w-48 md:w-64" placeholder="Szukaj znajomego..." />
                </div>
              </div>

              <div className="divide-y divide-solid divide-slate-100 dark:divide-slate-800">
                {isLoading ? (
                  [1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
                      <div className="w-12 h-48 bg-slate-100 dark:bg-slate-800 rounded-full" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded" />
                        <div className="h-3 w-20 bg-slate-50 dark:bg-slate-800/50 rounded" />
                      </div>
                    </div>
                  ))
                ) : friends.length > 0 ? (
                  friends.map(friend => (
                    <UserRow key={friend._id} person={friend} type="friend" />
                  ))
                ) : (
                  <div className="py-16 text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-200 dark:text-slate-800 mb-4">group_off</span>
                    <p className="text-on-surface-variant dark:text-slate-500 font-bold m-0">Nie masz jeszcze żadnych znajomych.</p>
                    <p className="text-outline text-xs mt-1">Znajdź wędkarzy w Twojej okolicy korzystając z sugestii.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar: Requests & Suggestions */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Zaproszenia */}
            {pendingRequests.length > 0 && (
              <section className="bg-white dark:bg-slate-900 rounded-3xl border border-solid border-secondary/30 p-6 shadow-lg shadow-secondary/5">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-secondary">notifications_active</span>
                  <h2 className="text-lg font-black text-on-surface dark:text-slate-200 m-0">Zaproszenia ({pendingRequests.length})</h2>
                </div>
                <div className="space-y-2">
                  {pendingRequests.map(req => (
                    <UserRow key={req._id} person={req} type="request" />
                  ))}
                </div>
              </section>
            )}

            {/* Sugestie */}
            <section className="bg-white dark:bg-slate-900 rounded-3xl border border-solid border-outline-variant dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">explore</span>
                <h2 className="text-lg font-black text-on-surface dark:text-slate-200 m-0">Sugerowani</h2>
              </div>
              <div className="space-y-2">
                {isLoading ? (
                  [1, 2].map(i => <div key={i} className="h-16 bg-slate-50 dark:bg-slate-800 rounded-xl animate-pulse" />)
                ) : suggestions.length > 0 ? (
                  suggestions.map(sug => (
                    <UserRow key={sug._id} person={sug} type="suggestion" />
                  ))
                ) : (
                  <p className="text-xs text-outline text-center m-0 italic">Brak nowych sugestii.</p>
                )}
              </div>
            </section>

            {/* Promo Card */}
            <div className="bg-gradient-to-br from-primary to-tertiary-container text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-sm font-black uppercase tracking-widest mb-2 opacity-80 m-0">Wspólne łowienie</h3>
                  <p className="text-xs leading-relaxed mb-4 m-0">Łowienie ze znajomymi to nie tylko zabawa, ale i wymiana doświadczeń. Zaproś kolegów nad wodę!</p>
                  <button className="w-full py-2.5 bg-white text-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-opacity-90 transition-all border-none cursor-pointer">Udostępnij profil</button>
               </div>
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            </div>
          </aside>

        </div>
      </main>

      <Dialog 
        open={confirmDialog.open} 
        onClose={() => setConfirmDialog({ open: false, friendId: null })}
        PaperProps={{ className: 'dark:bg-slate-900 dark:text-white rounded-3xl' }}
      >
        <DialogTitle className="font-black text-error">Usunąć znajomego?</DialogTitle>
        <DialogContent>
          <DialogContentText className="dark:text-slate-400 font-medium">
            Czy na pewno chcesz usunąć tę osobę ze znajomych? Tej operacji nie można cofnąć.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-6">
          <Button onClick={() => setConfirmDialog({ open: false, friendId: null })} className="font-bold text-slate-500">Anuluj</Button>
          <Button onClick={handleRemoveConfirm} className="bg-error text-white font-bold px-6 py-2 rounded-xl border-none">Usuń znajomego</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} className="rounded-xl font-bold">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Friends;
