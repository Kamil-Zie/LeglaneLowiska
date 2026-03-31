import React from 'react';
import { Box, Typography, Divider, Paper, Stack, IconButton, Chip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const UserPosts = ({ userPosts, isOwner, userData, onDeletePost }) => {
  return (
    <Box sx={{ mt: 4, width: '100%', maxWidth: '800px', mx: 'auto', pb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#1a5275', textAlign: 'center' }}>
        {isOwner ? 'Moje Połowy' : `Połowy użytkownika ${userData?.nazwa}`}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      {userPosts.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <Typography color="text.secondary">Brak wpisów na portalu.</Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {userPosts.map((post) => (
            <Paper key={post._id} sx={{ p: 2, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{post.ryba}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                {isOwner && (
                  <IconButton color="error" size="small" onClick={() => onDeletePost(post._id)}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                )}
              </Stack>
              
              {post.zdjecie && (
                <Box 
                  sx={{ 
                    width: '100%', 
                    maxHeight: 400, 
                    borderRadius: 2, 
                    my: 1, 
                    overflow: 'hidden',
                    backgroundColor: '#f0f2f5',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box 
                    component="img" 
                    src={post.zdjecie} 
                    sx={{ 
                      maxWidth: '100%', 
                      maxHeight: 400, 
                      objectFit: 'contain'
                    }} 
                  />
                </Box>
              )}
              
              <Stack direction="row" spacing={1} sx={{ my: 1.5 }}>
                <Chip label={`${post.rozmiar} cm`} size="small" variant="outlined" color="primary" />
                <Chip label={`${post.waga} kg`} size="small" variant="outlined" color="secondary" />
                <Chip label={post.miejsce} size="small" variant="outlined" />
              </Stack>
              
              {post.opis && (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  "{post.opis}"
                </Typography>
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default UserPosts;