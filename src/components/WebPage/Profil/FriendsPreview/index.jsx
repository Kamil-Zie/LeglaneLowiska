import React from 'react';
import { Box, Stack, Typography, Button, Divider, Grid, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FriendsPreview = ({ userData, isOwner }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 4, width: '100%', maxWidth: '800px', mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a5275' }}>
          Znajomi ({userData?.friends?.length || 0})
        </Typography>
        {isOwner && (
          <Button 
            size="small" 
            variant="text" 
            onClick={() => navigate('/znajomi')}
            sx={{ fontWeight: 'bold' }}
          >
            Zarządzaj znajomymi
          </Button>
        )}
      </Stack>
      <Divider sx={{ mb: 2 }} />
      
      {userData?.friends?.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ py: 2 }}>Brak znajomych.</Typography>
      ) : (
        <Grid container spacing={2}>
          {userData?.friends?.slice(0, 6).map((friend) => (
            <Grid item xs={4} sm={2} key={friend._id} sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(`/profil/${friend._id}`)}>
              <Avatar 
                sx={{ 
                  width: 60, 
                  height: 60, 
                  mx: 'auto', 
                  mb: 1,
                  bgcolor: 'primary.light',
                  fontSize: 24
                }}
              >
                {friend.nazwa ? friend.nazwa.charAt(0) : '?'}
              </Avatar>
              <Typography variant="caption" noWrap display="block">
                {friend.nazwa || 'Znajomy'}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FriendsPreview;