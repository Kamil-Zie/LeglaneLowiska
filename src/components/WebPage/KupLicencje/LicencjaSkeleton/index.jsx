import React from 'react';
import { Card, CardContent, CardActions, Stack, Skeleton, Divider } from '@mui/material';

const LicencjaSkeleton = () => (
  <Card sx={{ width: '100%', borderRadius: 3, height: '100%' }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width={80} height={24} />
      </Stack>
      <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="90%" height={20} />
      <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
      <Divider sx={{ my: 1.5 }} />
      <Skeleton variant="text" width="40%" height={40} />
    </CardContent>
    <CardActions sx={{ p: 2, pt: 0 }}>
      <Skeleton variant="rounded" width="100%" height={36} />
    </CardActions>
  </Card>
);

export default LicencjaSkeleton;