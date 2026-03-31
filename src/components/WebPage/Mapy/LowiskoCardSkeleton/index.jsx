import React from 'react';

const LowiskoCardSkeleton = () => (
  <div className="p-4 bg-white rounded-xl border border-solid border-outline-variant animate-pulse">
    <div className="flex justify-between items-start mb-2">
      <div className="h-6 w-1/2 bg-slate-100 rounded" />
      <div className="h-5 w-12 bg-slate-50 rounded-full" />
    </div>
    
    <div className="space-y-2 mb-4">
      <div className="h-3 w-full bg-slate-50 rounded" />
      <div className="h-3 w-5/6 bg-slate-50 rounded" />
    </div>

    <div className="flex items-center gap-3">
      <div className="flex-grow h-10 bg-slate-100 rounded-lg" />
      <div className="w-10 h-10 bg-slate-100 rounded-lg" />
    </div>
  </div>
);

export default LowiskoCardSkeleton;
