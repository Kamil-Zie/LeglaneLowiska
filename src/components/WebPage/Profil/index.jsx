import React, { useState, useEffect } from 'react';
import './pr0fil.css';
import Navbar from '../NavBar';
import { useAuth } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import '../WebPage.css';
import Avatar from '@mui/material/Avatar';
import { Box, Skeleton } from '@mui/material';

/* ─── Skeleton that mirrors the real profile layout ─── */
const ProfilSkeleton = () => (
  <div className="profil-wrapper">
    <div className="profil-card">

      {/* Avatar circle */}
      <div className="profil-header">
        <div className="avatar-placeholder">
          <Skeleton variant="circular" width={150} height={150} />
        </div>
      </div>

      {/* Name */}
      <div className="profil-name">
        <Skeleton variant="text" width={180} height={40} sx={{ mx: 'auto' }} />
      </div>

      {/* Description */}
      <div className="profil-description">
        <Skeleton variant="text" width={280} height={22} sx={{ mx: 'auto' }} />
        <Skeleton variant="text" width={220} height={22} sx={{ mx: 'auto' }} />
      </div>

      {/* Info rows */}
      <div className="profil-body">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="info-item" key={i}>
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={160} height={20} sx={{ ml: 1 }} />
          </div>
        ))}
      </div>
    </div>

    {/* Badge */}
    <div className="badge-list">
      <Skeleton variant="rounded" width={110} height={36} sx={{ borderRadius: '50px' }} />
    </div>

    {/* Stats grid */}
    <section className="stats-grid">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="stat-box" key={i}>
          <Skeleton variant="text" width={60} height={32} />
          <Skeleton variant="text" width={50} height={18} />
        </div>
      ))}
    </section>
  </div>
);

/* ─── Real profile content ─── */
const ProfilContent = ({ userData }) => (
  <div className="profil-wrapper">
    <div className="profil-card">
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

    <div className="badge-list">
      <span className="skill-badge">PZW Member</span>
    </div>

    <section className="stats-grid">
      <div className="stat-box">
        <span className="stat-value">Brak</span>
        <span className="stat-label">Wyprawy</span>
      </div>
      <div className="stat-box">
        <span className="stat-value">Brak</span>
        <span className="stat-label">Rekord</span>
      </div>
      <div className="stat-box">
        <span className="stat-value">Brak</span>
        <span className="stat-label">Łowisk</span>
      </div>
    </section>
  </div>
);

/* ─── Page ─── */
const Profil = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${user._id}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="web-page-container">
        {isLoading ? <ProfilSkeleton /> : <ProfilContent userData={userData} />}
      </div>
    </>
  );
};

export default Profil;
