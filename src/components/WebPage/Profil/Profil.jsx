import React from 'react';
import './pr0fil.css';
import Navbar from '../NavBar/navbar';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import '../WebPage.css';
import Avatar from '@mui/material/Avatar';

const Profil = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${user._id}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <>
    <Navbar />
      <div className="web-page-container">
      <div className="profil-wrapper">
        <div className="profil-card">
          <div className="profil-header">
            <div className="avatar-placeholder">
              <Avatar sx={{ bgcolor: '#1a5275', width: 150, height: 150, fontSize: 60 }}>
                {userData?.nazwa?.charAt(0) || "B"}
              </Avatar>
            </div>
          </div>
          <div className="profil-name">
            <h2>{userData?.nazwa || "Brak nazwy"}</h2>
            </div>
          <div className="profil-description">
          <p>{userData?.opis || "Brak opisu"}</p>
          </div>
          <div className="profil-body">
            <div className="info-item">
              <span className="info-label"><b>Email: </b></span>
              <span className="info-value">{userData?.email || "Brak danych"}</span>
            </div>
            <div className="info-item">
              <span className="info-label"><b>Nr Karty PZW: </b></span>
              <span className="info-value">{userData?.nrKartyPZW || "Brak danych"}</span>
            </div>
            <div className="info-item">
              <span className="info-label"><b>Moje Punkty: </b></span>
              <span className="info-value">⭐ {userData?.punkty || 0} pkt</span>
            </div>
            <div className="info-item">
              <span className="info-label"><b>Lokalizacja: </b></span>
              <span className="info-value">{userData?.lokalizacja || "Brak danych"}</span>
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
    </div>
    </>
  );
};

export default Profil;