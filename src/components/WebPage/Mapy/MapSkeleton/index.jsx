import React from 'react';

const MapSkeleton = () => (
  <div className="w-full h-full bg-surface-container-highest animate-pulse flex items-center justify-center">
    <div className="flex flex-col items-center opacity-20">
      <span className="material-symbols-outlined text-9xl mb-4">map</span>
      <div className="h-4 w-48 bg-on-surface rounded-full" />
    </div>
  </div>
);

export default MapSkeleton;
