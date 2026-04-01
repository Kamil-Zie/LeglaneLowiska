import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar';
import { Avatar, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import axios from '../../../api/axios';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import MobileNav from '../MobileNav';

const Friends = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, friendId: null });

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const fetchFriendsData = async () => {
    try {
      const [listRes, suggestionsRes] = await Promise.all([axios.get('/friends/list'), axios.get('/friends/suggestions')]);
      setFriends(listRes.data.friends);
      setPendingRequests(listRes.data.pendingRequests);
      setSuggestions(suggestionsRes.data.suggestions);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchFriendsData(); }, []);

  const handleSendRequest = async (targetId) => {
    try {
      await axios.post(`/friends/request/${targetId}`);
      setSuggestions(suggestions.filter(s => s._id !== targetId));
      setSnackbar({ open: true, message: 'Zaproszenie wysłane!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Błąd.', severity: 'error' });
    }
  };

  const handleAcceptRequest = async (requesterId) => {
    try {
      const response = await axios.post(`/friends/accept/${requesterId}`);
      updateUser(response.data.user);
      fetchFriendsData();
      setSnackbar({ open: true, message: 'Zaakceptowano!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Błąd.', severity: 'error' });
    }
  };

  const UserRow = ({ person, type }) => (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
      <div className="flex items-center gap-4">
        <Avatar src={person.zdjecie} sx={{ width: 48, height: 48, bgcolor: 'primary.main' }} onClick={() => navigate(`/profil/${person._id}`)} className="cursor-pointer">{person.nazwa[0]}</Avatar>
        <div><h4 className="text-sm font-black m-0 cursor-pointer" onClick={() => navigate(`/profil/${person._id}`)}>{person.nazwa}</h4><p className="text-[10px] text-outline uppercase m-0">{person.miasto || 'Wędkarz'}</p></div>
      </div>
      <div className="flex gap-2">
        {type === 'suggestion' && <button onClick={() => handleSendRequest(person._id)} className="px-4 py-2 bg-primary text-white text-[10px] font-black rounded-lg border-none cursor-pointer uppercase tracking-widest">Dodaj</button>}
        {type === 'request' && <button onClick={() => handleAcceptRequest(person._id)} className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center border-none cursor-pointer"><span className="material-symbols-outlined">check</span></button>}
      </div>
    </div>
  );

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
        <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-12 text-left">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8 space-y-8">
              <section className="bg-white dark:bg-slate-900 rounded-3xl border border-solid border-outline-variant p-8 shadow-sm">
                <h1 className="text-3xl font-black text-primary m-0 uppercase tracking-tight">Znajomi ({friends.length})</h1>
                <div className="mt-8 divide-y divide-solid divide-slate-100">
                  {friends.map(f => <UserRow key={f._id} person={f} type="friend" />)}
                </div>
              </section>
            </div>
            <aside className="col-span-4 space-y-8">
              {pendingRequests.length > 0 && <section className="bg-white dark:bg-slate-900 rounded-3xl border border-solid border-secondary/30 p-6 shadow-sm"><h2 className="text-lg font-black m-0 mb-4">Zaproszenia</h2>{pendingRequests.map(r => <UserRow key={r._id} person={r} type="request" />)}</section>}
              <section className="bg-white dark:bg-slate-900 rounded-3xl border border-solid border-outline-variant p-6 shadow-sm"><h2 className="text-lg font-black m-0 mb-4">Sugestie</h2>{suggestions.map(s => <UserRow key={s._id} person={s} type="suggestion" />)}</section>
            </aside>
          </div>
        </main>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex flex-col min-h-screen pb-24 text-left">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 shadow-sm">
          <div className="flex justify-between items-center px-4 h-16 max-w-2xl mx-auto">
            <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sky-700">anchor</span><h1 className="text-xl font-black text-sky-800 m-0">Znajomi</h1></div>
          </div>
        </header>
        <main className="flex-grow pt-20 px-4 space-y-8 max-w-2xl mx-auto w-full">
          {pendingRequests.length > 0 && <section><h3 className="text-sm font-bold uppercase mb-4">Zaproszenia</h3><div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-solid border-slate-100">{pendingRequests.map(r => <UserRow key={r._id} person={r} type="request" />)}</div></section>}
          <section><h3 className="text-sm font-bold uppercase mb-4">Twoja Lista</h3><div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-solid border-slate-100">{friends.length > 0 ? friends.map(f => <UserRow key={f._id} person={f} type="friend" />) : <p className="p-8 text-center text-slate-400">Brak znajomych.</p>}</div></section>
          <section><h3 className="text-sm font-bold uppercase mb-4">Sugerowani</h3><div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-solid border-slate-100">{suggestions.map(s => <UserRow key={s._id} person={s} type="suggestion" />)}</div></section>
        </main>
        <MobileNav />
      </div>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}><Alert onClose={handleCloseSnackbar} severity={snackbar.severity} className="rounded-xl font-bold">{snackbar.message}</Alert></Snackbar>
    </div>
  );
};

export default Friends;
