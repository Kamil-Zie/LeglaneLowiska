import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ProfilCard = ({ userData, onEdit, isOwner }) => {
  return (
    <div className="profil-card" style={{ position: 'relative' }}>
      {isOwner && (
        <IconButton 
          onClick={onEdit} 
          sx={{ position: 'absolute', top: 10, right: 10, color: '#1a5275' }}
        >
          <EditIcon />
        </IconButton>
      )}
      
      <div className="profil-header">
        <div className="avatar-placeholder">
          <Avatar sx={{ bgcolor: '#1a5275', width: 150, height: 150, fontSize: 60 }}>
            {userData?.nazwa?.charAt(0) || 'B'}
          </Avatar>
        </div>
      </div>
      <div className="profil-name">
        <h2>{userData?.nazwa || 'Brak nazwy'}</h2>
      </div>
      <div className="profil-description">
        <p>{userData?.opis || 'Brak opisu'}</p>
      </div>
      <div className="profil-body">
        <div className="info-item">
          <span className="info-label"><b>Email: </b></span>
          <span className="info-value">{userData?.email || 'Brak danych'}</span>
        </div>
        <div className="info-item">
          <span className="info-label"><b>Nr Karty PZW: </b></span>
          <span className="info-value">{userData?.nrKartyPZW || 'Brak danych'}</span>
        </div>
        <div className="info-item">
          <span className="info-label"><b>Moje Punkty: </b></span>
          <span className="info-value">⭐ {userData?.punkty || 0} pkt</span>
        </div>
        <div className="info-item">
          <span className="info-label"><b>Lokalizacja: </b></span>
          <span className="info-value">{userData?.lokalizacja || 'Brak danych'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilCard;