import { useState, useEffect } from 'react';
import {  Snackbar, Alert } from '@mui/material';
import axios from '../../../api/axios';
import { useAuth } from '../../../context/AuthContext';
import FriendsMobile from './mobile';
import FriendsDesktop from './desktop';

const Friends = () => {
  const {  updateUser } = useAuth();
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const fetchFriendsData = async () => {
    try {
      const [listRes, suggestionsRes] = await Promise.all([axios.get('/friends/list'), axios.get('/friends/suggestions')]);
      console.log('Friends List Response:', listRes.data);
      setFriends(listRes.data.friends);
      setPendingRequests(listRes.data.pendingRequests);
      setSentRequests(listRes.data.sentRequests || []);
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
      fetchFriendsData();
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

  const handleCancelRequest = async (targetId) => {
    try {
      await axios.post(`/friends/cancel/${targetId}`);
      fetchFriendsData();
      setSnackbar({ open: true, message: 'Zaproszenie anulowane!', severity: 'info' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Błąd podczas anulowania.', severity: 'error' });
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
        <FriendsDesktop 
        friends={friends}
        pendingRequests={pendingRequests}
        sentRequests={sentRequests}
        suggestions={suggestions}
        isLoading={isLoading}
        handleSendRequest={handleSendRequest}
        handleAcceptRequest={handleAcceptRequest}
        handleCancelRequest={handleCancelRequest}/>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex flex-col min-h-screen pb-24 text-left">
        <FriendsMobile 
        friends={friends}
        pendingRequests={pendingRequests}
        sentRequests={sentRequests}
        suggestions={suggestions}
        isLoading={isLoading}
        handleSendRequest={handleSendRequest}
        handleAcceptRequest={handleAcceptRequest}
        handleCancelRequest={handleCancelRequest}/>
      </div>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} className="rounded-xl font-bold">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Friends;
