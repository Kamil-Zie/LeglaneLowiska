import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton
} from '@mui/material';

const PostDialog = ({ open, onClose, postData, setPostData, onSave, mode = 'create', onImageChange }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        fontWeight: 900,
        fontSize: '1.25rem',
        color: 'primary.main',
        pb: 1
      }}>
        {mode === 'create' ? 'Podziel się połowem' : 'Edytuj swój wpis'}
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          <span className="material-symbols-outlined">close</span>
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ mt: 1 }}>
        <div className="space-y-6 pt-2">
          {/* Main Info */}
          <div className="grid grid-cols-1 gap-4">
             <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Gatunek ryby</label>
              <input 
                placeholder="np. Szczupak, Okoń..." 
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                value={postData.ryba} 
                onChange={(e) => setPostData({ ...postData, ryba: e.target.value })} 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Długość (cm)</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  value={postData.rozmiar} 
                  onChange={(e) => setPostData({ ...postData, rozmiar: e.target.value })} 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Waga (kg)</label>
                <input 
                  type="number" 
                  placeholder="0.0" 
                  step="0.1"
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  value={postData.waga} 
                  onChange={(e) => setPostData({ ...postData, waga: e.target.value })} 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Miejsce połowu</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary text-lg">location_on</span>
                <input 
                  placeholder="Gdzie złowiono?" 
                  className="w-full bg-surface-container-low border-none rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  value={postData.miejsce} 
                  onChange={(e) => setPostData({ ...postData, miejsce: e.target.value })} 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Opis (opcjonalnie)</label>
              <textarea 
                rows={3} 
                placeholder="Opisz swoje wrażenia, przynętę..." 
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                value={postData.opis} 
                onChange={(e) => setPostData({ ...postData, opis: e.target.value })} 
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Zdjęcie okazu</label>
             {!postData.zdjecie ? (
               <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-outline-variant rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
                   <span className="material-symbols-outlined text-4xl text-primary mb-2">add_a_photo</span>
                   <p className="text-xs font-bold text-on-surface">Kliknij, aby dodać zdjęcie</p>
                   <p className="text-[10px] text-outline mt-1">JPG, PNG lub WEBP (Max. 5MB)</p>
                 </div>
                 <input type="file" className="hidden" accept="image/*" onChange={onImageChange} />
               </label>
             ) : (
               <div className="relative group rounded-xl overflow-hidden border border-solid border-outline-variant">
                 <img src={postData.zdjecie} alt="preview" className="w-full h-48 object-cover" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <label className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">edit</span>
                      <input type="file" className="hidden" accept="image/*" onChange={onImageChange} />
                    </label>
                    <button 
                      onClick={() => setPostData({ ...postData, zdjecie: '' })}
                      className="w-10 h-10 rounded-full bg-white text-error flex items-center justify-center border-none cursor-pointer hover:scale-110 transition-transform"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                 </div>
               </div>
             )}
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ p: 4, pt: 2 }}>
        <button 
          onClick={onClose} 
          className="flex-grow py-3 px-6 text-sm font-bold text-on-surface-variant hover:bg-slate-100 rounded-xl transition-colors border-none bg-transparent cursor-pointer"
        >
          Anuluj
        </button>
        <button 
          disabled={!postData.ryba || !postData.rozmiar || !postData.waga || !postData.miejsce}
          onClick={onSave}
          className="flex-grow py-3 px-6 text-sm font-bold text-white bg-primary hover:brightness-110 rounded-xl transition-all border-none cursor-pointer disabled:opacity-50 disabled:grayscale shadow-md active:scale-95"
        >
          {mode === 'create' ? 'Opublikuj post' : 'Zapisz zmiany'}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
