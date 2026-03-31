import React from 'react';

const LicencjaSkeleton = () => (
  <div className="bg-white rounded-xl border border-solid border-outline-variant overflow-hidden shadow-sm animate-pulse flex flex-col h-full w-full">
    <div className="h-40 bg-slate-100 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-white/50" />
    </div>

    <div className="p-6 flex flex-col flex-grow">
      <div className="h-6 w-3/4 bg-slate-100 rounded mb-4" />
      
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-slate-50 rounded" />
        <div className="h-3 w-32 bg-slate-50 rounded" />
      </div>

      <div className="space-y-2 mb-6">
        <div className="h-3 w-full bg-slate-50 rounded" />
        <div className="h-3 w-5/6 bg-slate-50 rounded" />
      </div>

      <div className="mt-auto pt-6 border-0 border-t border-solid border-slate-50 flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-2 w-12 bg-slate-50 rounded" />
          <div className="h-6 w-24 bg-slate-100 rounded" />
        </div>
        <div className="h-10 w-28 bg-slate-100 rounded-lg" />
      </div>
    </div>
  </div>
);

export default LicencjaSkeleton;
