import './pr0fil.css';
import Navbar from '../NavBar/navbar';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from '../../../api/axios';

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
        </div>
      </div>
    </div>
    </>
  );
};

export default Profil;