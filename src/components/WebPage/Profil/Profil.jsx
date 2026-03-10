<<<<<<< HEAD
import React from 'react';
import Navbar from '../NavBar/navbar';
import './pr0fil.css';
import wedkarz from './wedkarz.jpg';
=======
import Navbar from '../NavBar/navbar';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import '../Webpage.css';

>>>>>>> c5a21862b32b0d887ec4fa1f0f01d8b5765793c6
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
<<<<<<< HEAD
    <div className="profil-container">
      <Navbar />
      
      <main className="profil-card">
        <div className="avatar-wrapper">
          <img src={wedkarz} alt="Wujek Wędkarz" className="avatar-img" />
=======
    <>
    <Navbar />
      <div className="web-page-container">
      <div className="profil-wrapper">
        <div className="profil-card">
          <div className="profil-header">
            <div className="avatar-placeholder">👤</div>
            <h2>{userData?.nazwa || "Brak nazwy"}</h2>
            <p>{userData?.opis || "Brak opisu"}</p>
          </div>
          <div className="profil-body">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Nr Karty PZW:</span>
              <span className="info-value">{userData?.nrKartyPZW || "Brak danych"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Moje Punkty:</span>
              <span className="info-value">⭐ {userData?.punkty || 0} pkt</span>
            </div>
            <div className="info-item">
              <span className="info-label">Lokalizacja:</span>
              <span className="info-value">{userData?.lokalizacja || "Brak danych"}</span>
            </div>
          </div>
>>>>>>> c5a21862b32b0d887ec4fa1f0f01d8b5765793c6
        </div>
        
        <h1 className="user-name">Wujek Wędkarz</h1>
        <span className="user-title">Karpiarz</span>
        
        <p className="user-bio">
          SYNEK, NA WODZIE TO SIĘ PRAWDZIWE OKAZY ŁAPIE! TAM JEST ŻYWIOŁ!
        </p>

        <div className="badge-list">
          <span className="skill-badge">PZW Member</span>
        </div>

        <section className="stats-grid">
          <div className="stat-box">
            <span className="stat-value">124</span>
            <span className="stat-label">Wyprawy</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">84 cm</span>
            <span className="stat-label">Rekord</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">12</span>
            <span className="stat-label">Łowisk</span>
          </div>
        </section>
      </main>
    </div>
    </>
  );
};

export default Profil;