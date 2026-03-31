import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  IconButton
} from '@mui/material';

const EditProfileDialog = ({ open, onClose, editData, setEditData, onSave }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        fontWeight: 900,
        fontSize: '1.5rem',
        color: 'primary.main',
        pt: 3,
        px: 4
      }}>
        Edytuj swój profil
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          <span className="material-symbols-outlined">close</span>
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ px: 4, pb: 4 }}>
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Nazwa użytkownika</label>
              <input 
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                value={editData.nazwa} 
                onChange={(e) => setEditData({ ...editData, nazwa: e.target.value })} 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Adres Email</label>
              <input 
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                value={editData.email} 
                onChange={(e) => setEditData({ ...editData, email: e.target.value })} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Miasto</label>
              <input 
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                value={editData.miasto} 
                onChange={(e) => setEditData({ ...editData, miasto: e.target.value })} 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Numer Karty PZW</label>
              <input 
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                value={editData.nrKartyPZW} 
                onChange={(e) => setEditData({ ...editData, nrKartyPZW: e.target.value })} 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Lokalizacja (dokładniejsza)</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary text-lg">location_on</span>
              <input 
                placeholder="np. Mazury, Giżycko..."
                className="w-full bg-surface-container-low border-none rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                value={editData.lokalizacja} 
                onChange={(e) => setEditData({ ...editData, lokalizacja: e.target.value })} 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Twój opis (Bio)</label>
            <textarea 
              rows={4} 
              placeholder="Napisz kilka słów o swojej pasji..."
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
              value={editData.opis} 
              onChange={(e) => setEditData({ ...editData, opis: e.target.value })} 
            />
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 4, pt: 0 }}>
        <button 
          onClick={onClose} 
          className="flex-grow py-3.5 px-6 text-sm font-bold text-on-surface-variant hover:bg-slate-100 rounded-2xl transition-colors border-none bg-transparent cursor-pointer"
        >
          Anuluj
        </button>
        <button 
          disabled={!editData.nazwa || !editData.email}
          onClick={onSave}
          className="flex-grow py-3.5 px-6 text-sm font-bold text-white bg-primary hover:brightness-110 rounded-2xl transition-all border-none cursor-pointer shadow-lg active:scale-95 disabled:opacity-50 disabled:grayscale"
        >
          Zapisz zmiany
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
