import React from 'react';
import Navbar from '../NavBar/navbar';
import './pr0fil.css';
import wedkarz from './wedkarz.jpg';
const Profil = () => {
  return (
    <div className="profil-container">
      <Navbar />
      
      <main className="profil-card">
        <div className="avatar-wrapper">
          <img src={wedkarz} alt="Wujek Wędkarz" className="avatar-img" />
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
  );
};

export default Profil;