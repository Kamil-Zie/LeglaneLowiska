import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Skeleton,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
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
      alert('Zaproszenie wysłane!');
    } catch (err) {
      alert(err.response?.data?.message || 'Błąd wysyłania zaproszenia');
    }
  };

  const handleAcceptRequest = async (requesterId) => {
    try {
      const response = await axios.post(`/friends/accept/${requesterId}`);
      updateUser(response.data.user);
      fetchFriendsData();
    } catch (err) {
      alert('Błąd podczas akceptowania zaproszenia');
    }
  };

  const handleDeclineRequest = async (requesterId) => {
    try {
      const response = await axios.post(`/friends/decline/${requesterId}`);
      updateUser(response.data.user);
      fetchFriendsData();
    } catch (err) {
      alert('Błąd podczas odrzucania zaproszenia');
    }
  };

  const handleRemoveFriend = async (friendId) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę osobę ze znajomych?")) return;
    try {
      const response = await axios.delete(`/friends/${friendId}`);
      updateUser(response.data.user);
      fetchFriendsData();
    } catch (err) {
      alert('Błąd podczas usuwania znajomego');
    }
  };

  const UserItem = ({ person, type, onAction }) => (
    <ListItem sx={{ px: 0 }}>
      <ListItemAvatar>
        <Avatar 
          sx={{ bgcolor: 'primary.main', cursor: 'pointer' }} 
          onClick={() => navigate(`/profil/${person._id}`)}
        >
          {person.nazwa[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText 
        primary={
          <Typography 
            fontWeight="bold" 
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            onClick={() => navigate(`/profil/${person._id}`)}
          >
            {person.nazwa}
          </Typography>
        } 
        secondary={person.miasto || person.opis || 'Brak danych'} 
      />
      <ListItemSecondaryAction>
        {type === 'suggestion' && (
          <Button 
            size="small" 
            variant="outlined" 
            startIcon={<PersonAddIcon />}
            onClick={() => handleSendRequest(person._id)}
          >
            Dodaj
          </Button>
        )}
        {type === 'request' && (
          <Stack direction="row" spacing={1}>
            <IconButton color="success" size="small" onClick={() => handleAcceptRequest(person._id)}>
              <CheckIcon />
            </IconButton>
            <IconButton color="error" size="small" onClick={() => handleDeclineRequest(person._id)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        )}
        {type === 'friend' && (
          <IconButton color="error" size="small" onClick={() => handleRemoveFriend(person._id)}>
            <PersonRemoveIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );

  return (
    <Box sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', pb: 4 }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column: Friends List */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <GroupIcon color="primary" />
                <Typography variant="h5" fontWeight="bold">Twoi Znajomi ({friends.length})</Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width="60%" height={25} />
                  </Box>
                ))
              ) : friends.length > 0 ? (
                <List>
                  {friends.map(friend => (
                    <UserItem key={friend._id} person={friend} type="friend" />
                  ))}
                </List>
              ) : (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography color="text.secondary">Nie masz jeszcze żadnych znajomych.</Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Right Column: Requests & Suggestions */}
          <Grid item xs={12} md={4}>
            <Stack spacing={4}>
              {/* Requests */}
              {pendingRequests.length > 0 && (
                <Paper sx={{ p: 3, borderRadius: 3, borderLeft: '5px solid #2e7d32' }}>
                  <Typography variant="h6" fontWeight="bold" mb={2}>Zaproszenia ({pendingRequests.length})</Typography>
                  <List dense>
                    {pendingRequests.map(req => (
                      <UserItem key={req._id} person={req} type="request" />
                    ))}
                  </List>
                </Paper>
              )}

              {/* Suggestions */}
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>Sugerowani znajomi</Typography>
                <Divider sx={{ mb: 2 }} />
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
                      <Skeleton variant="circular" width={32} height={32} />
                      <Skeleton variant="text" width="50%" height={20} />
                    </Box>
                  ))
                ) : suggestions.length > 0 ? (
                  <List dense>
                    {suggestions.map(sug => (
                      <UserItem key={sug._id} person={sug} type="suggestion" />
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">Brak nowych sugestii.</Typography>
                )}
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Friends;