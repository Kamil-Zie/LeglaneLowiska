import React from 'react';
import { Skeleton } from '@mui/material';

const ProfilSkeleton = () => (
  <div className="max-w-screen-xl mx-auto px-6 py-8 animate-pulse">
    {/* Card Skeleton */}
    <div className="bg-white rounded-3xl overflow-hidden border border-solid border-outline-variant shadow-xl relative mb-12">
      <div className="h-48 bg-slate-100" />
      <div className="px-8 pb-8 flex flex-col items-center -mt-20">
        <div className="w-[160px] h-[160px] rounded-full bg-slate-200 border-[6px] border-solid border-white shadow-lg" />
        <div className="mt-4 space-y-2 flex flex-col items-center">
          <div className="h-8 w-48 bg-slate-100 rounded-lg" />
          <div className="h-4 w-24 bg-slate-50 rounded-lg" />
        </div>
        <div className="mt-6 flex gap-2">
          <div className="h-6 w-24 bg-slate-50 rounded-full" />
          <div className="h-6 w-24 bg-slate-50 rounded-full" />
          <div className="h-6 w-24 bg-slate-50 rounded-full" />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 bg-slate-50 rounded-xl border border-solid border-slate-100" />
          ))}
        </div>
      </div>
    </div>

    {/* Stats Skeleton */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-32 bg-white rounded-2xl border border-solid border-outline-variant shadow-sm" />
      ))}
    </div>

    {/* Content Section Skeleton */}
    <div className="space-y-8">
      <div className="h-10 w-48 bg-slate-100 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map(i => (
          <div key={i} className="h-48 bg-white rounded-3xl border border-solid border-outline-variant shadow-sm" />
        ))}
      </div>
    </div>
  </div>
);

export default ProfilSkeleton;
