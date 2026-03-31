import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Stack, 
  TextField, 
  Divider, 
  Button 
} from '@mui/material';

const EditProfileDialog = ({ open, onClose, editData, setEditData, onSave }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Edytuj Profil</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField 
            label="Nazwa użytkownika" 
            fullWidth 
            value={editData.nazwa} 
            onChange={(e) => setEditData({ ...editData, nazwa: e.target.value })} 
          />
          <TextField 
            label="Email" 
            fullWidth 
            value={editData.email} 
            onChange={(e) => setEditData({ ...editData, email: e.target.value })} 
          />
          <TextField 
            label="Miasto" 
            fullWidth 
            value={editData.miasto} 
            onChange={(e) => setEditData({ ...editData, miasto: e.target.value })} 
          />
          <TextField 
            label="Lokalizacja (dokładniejsza)" 
            fullWidth 
            value={editData.lokalizacja} 
            onChange={(e) => setEditData({ ...editData, lokalizacja: e.target.value })} 
          />
          <TextField 
            label="Nr Karty PZW" 
            fullWidth 
            value={editData.nrKartyPZW} 
            onChange={(e) => setEditData({ ...editData, nrKartyPZW: e.target.value })} 
          />
          <TextField 
            label="Opis" 
            multiline 
            rows={3} 
            fullWidth 
            value={editData.opis} 
            onChange={(e) => setEditData({ ...editData, opis: e.target.value })} 
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Anuluj</Button>
        <Button 
          variant="contained" 
          onClick={onSave}
          disabled={!editData.nazwa || !editData.email}
        >
          Zapisz zmiany
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;