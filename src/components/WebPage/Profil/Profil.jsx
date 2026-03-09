import './pr0fil.css';
import Navbar from '../NavBar/navbar';

const Profil = () => {
  return (
    <div className="web-page-container">
      <Navbar />

      {/* GŁÓWNA TREŚĆ PROFILU */}
      <div className="profil-wrapper">
        <div className="profil-card">
          
          <div className="profil-header">
            <div className="avatar-placeholder">👤</div>
            <h2>Kamil Wędkarz</h2>
            <p>Pasjonat Spinningu</p>
          </div>

          <div className="profil-body">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">kamil@lowiska.pl</span>
            </div>

            <div className="info-item">
              <span className="info-label">Nr Karty PZW:</span>
              <span className="info-value">WA/123/456/2024</span>
            </div>

            <div className="info-item">
              <span className="info-label">Moje Punkty:</span>
              <span className="info-value">⭐ 150 pkt</span>
            </div>

            <div className="info-item">
              <span className="info-label">Lokalizacja:</span>
              <span className="info-value">Warszawa</span>
            </div>

            <button className="btn-logout">Wyloguj się</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profil;