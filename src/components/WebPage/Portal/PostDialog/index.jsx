import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Divider,
  Button,
  Box,
  Typography
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const PostDialog = ({ open, onClose, postData, setPostData, onSave, mode = 'create', onImageChange }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        {mode === 'create' ? 'Stwórz post' : 'Edytuj post'}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField 
            label="Gatunek ryby" 
            fullWidth 
            value={postData.ryba} 
            onChange={(e) => setPostData({ ...postData, ryba: e.target.value })} 
          />
          <Stack direction="row" spacing={2}>
            <TextField 
              label="Długość (cm)" 
              type="number" 
              fullWidth 
              value={postData.rozmiar} 
              onChange={(e) => setPostData({ ...postData, rozmiar: e.target.value })} 
            />
            <TextField 
              label="Waga (kg)" 
              type="number" 
              fullWidth 
              value={postData.waga} 
              onChange={(e) => setPostData({ ...postData, waga: e.target.value })} 
            />
          </Stack>
          <TextField 
            label="Miejsce połowu" 
            fullWidth 
            value={postData.miejsce} 
            onChange={(e) => setPostData({ ...postData, miejsce: e.target.value })} 
          />
          <TextField 
            label="Opis" 
            multiline 
            rows={3} 
            fullWidth 
            value={postData.opis} 
            onChange={(e) => setPostData({ ...postData, opis: e.target.value })} 
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
              sx={{ borderRadius: 2 }}
            >
              {mode === 'create' ? 'Dodaj zdjęcie' : 'Zmień zdjęcie'}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={onImageChange}
              />
            </Button>
            {postData.zdjecie && mode === 'edit' && (
              <Button color="error" size="small" onClick={() => setPostData({ ...postData, zdjecie: '' })}>
                Usuń zdjęcie
              </Button>
            )}
            {postData.zdjecie && mode === 'create' && (
              <Typography variant="caption" color="success.main">Zdjęcie wybrane!</Typography>
            )}
          </Box>
          {postData.zdjecie && (
            <Box 
              component="img" 
              src={postData.zdjecie} 
              sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 2 }} 
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Anuluj</Button>
        <Button 
          variant="contained" 
          onClick={onSave}
          disabled={!postData.ryba || !postData.rozmiar || !postData.waga || !postData.miejsce}
        >
          {mode === 'create' ? 'Opublikuj' : 'Zapisz zmiany'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;