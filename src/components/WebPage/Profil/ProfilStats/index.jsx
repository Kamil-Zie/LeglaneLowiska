import React from 'react';

const ProfilStats = ({ userPosts, userData }) => {
  const recordPost = userPosts.length > 0 
    ? userPosts.reduce((prev, current) => (parseFloat(prev.waga) > parseFloat(current.waga)) ? prev : current)
    : null;

  return (
    <section className="stats-grid">
      <div className="stat-box">
        <span className="stat-value">{userPosts.length}</span>
        <span className="stat-label">Wpisy</span>
      </div>
      <div className="stat-box">
        <span className="stat-value">
          {recordPost ? `${recordPost.waga} kg` : 'Brak'}
        </span>
        <span className="stat-label" style={{ textAlign: 'center' }}>
          {recordPost ? `${recordPost.ryba} (${recordPost.rozmiar} cm)` : 'Rekord'}
        </span>
      </div>
      <div className="stat-box">
        <span className="stat-value">{userData?.ulubioneLowiska?.length || 0}</span>
        <span className="stat-label">Ulubione</span>
      </div>
    </section>
  );
};

export default ProfilStats;