import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Divider, Stack, Skeleton } from '@mui/material';

const PostSkeleton = () => (
  <Card sx={{ borderRadius: 3, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
    <CardHeader
      avatar={<Skeleton variant="circular" width={40} height={40} />}
      title={<Skeleton variant="text" width="40%" height={20} />}
      subheader={<Skeleton variant="text" width="30%" height={15} />}
    />
    <CardContent>
      <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2, mb: 2 }} />
      <Skeleton variant="text" width="60%" height={25} sx={{ mb: 2 }} />
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Skeleton variant="rounded" width={60} height={32} />
        <Skeleton variant="rounded" width={60} height={32} />
        <Skeleton variant="rounded" width={100} height={32} />
      </Stack>
      <Skeleton variant="text" width="90%" height={20} />
      <Skeleton variant="text" width="80%" height={20} />
    </CardContent>
    <Divider sx={{ mx: 2 }} />
    <CardActions sx={{ px: 2, justifyContent: 'space-around' }}>
      <Skeleton variant="text" width="30%" height={40} />
      <Skeleton variant="text" width="30%" height={40} />
    </CardActions>
  </Card>
);

export default PostSkeleton;