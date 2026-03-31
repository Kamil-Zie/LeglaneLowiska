import React from 'react';
import { Skeleton } from '@mui/material';

const MapSkeleton = () => (
  <Skeleton
    variant="rounded"
    sx={{ flexGrow: 1, minHeight: '60vh', borderRadius: 3 }}
  />
);

export default MapSkeleton;