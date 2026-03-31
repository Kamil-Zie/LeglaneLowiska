import React from 'react';

const PostSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-solid border-outline-variant shadow-sm animate-pulse">
    {/* Image Header Skeleton */}
    <div className="h-64 bg-slate-100" />

    <div className="p-5">
      {/* User Info Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100" />
          <div className="space-y-1.5">
            <div className="h-3 w-24 bg-slate-100 rounded" />
            <div className="h-2 w-16 bg-slate-50 rounded" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="h-5 w-3/4 bg-slate-100 rounded mb-4" />
      
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-12 bg-slate-100 rounded" />
        <div className="h-6 w-12 bg-slate-100 rounded" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-slate-50 rounded" />
        <div className="h-3 w-5/6 bg-slate-50 rounded" />
      </div>

      {/* Interactions Skeleton */}
      <div className="flex items-center justify-between border-0 border-t border-solid border-slate-50 pt-4">
        <div className="flex items-center gap-4">
          <div className="h-4 w-12 bg-slate-100 rounded" />
          <div className="h-4 w-12 bg-slate-100 rounded" />
        </div>
        <div className="h-4 w-4 bg-slate-100 rounded" />
      </div>
    </div>
  </div>
);

export default PostSkeleton;
