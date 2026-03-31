import React from 'react';
import { Box, Skeleton, Divider } from '@mui/material';

const LowiskoCardSkeleton = () => (
  <Box
    sx={{
      borderRadius: 3,
      p: 2,
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Skeleton variant="text" width="70%" height={28} />
    <Skeleton variant="text" width="100%" height={18} sx={{ mt: 0.5 }} />
    <Skeleton variant="text" width="90%" height={18} />
    <Divider sx={{ my: 1 }} />
    <Skeleton variant="text" width="50%" height={18} />
    <Skeleton variant="text" width="40%" height={18} sx={{ mt: 0.5 }} />
    <Skeleton variant="rounded" width={80} height={24} sx={{ mt: 1 }} />
    <Skeleton variant="rounded" width="100%" height={36} sx={{ mt: 1.5, borderRadius: 2 }} />
  </Box>
);

export default LowiskoCardSkeleton;