import React from 'react';
import { Skeleton } from '@mui/material';

const ProfilSkeleton = () => (
  <div className="profil-wrapper">
    <div className="profil-card">
      <div className="profil-header">
        <div className="avatar-placeholder">
          <Skeleton variant="circular" width={150} height={150} />
        </div>
      </div>
      <div className="profil-name">
        <Skeleton variant="text" width={180} height={40} sx={{ mx: 'auto' }} />
      </div>
      <div className="profil-description">
        <Skeleton variant="text" width={280} height={22} sx={{ mx: 'auto' }} />
        <Skeleton variant="text" width={220} height={22} sx={{ mx: 'auto' }} />
      </div>
      <div className="profil-body">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="info-item" key={i}>
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={160} height={20} sx={{ ml: 1 }} />
          </div>
        ))}
      </div>
    </div>
    <div className="badge-list">
      <Skeleton variant="rounded" width={110} height={36} sx={{ borderRadius: '50px' }} />
    </div>
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

export default ProfilSkeleton;