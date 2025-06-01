import { Skeleton, Box } from '@mui/material';
import React from 'react';

function Loader() {
  return (
    <Box sx={{ maxWidth: 345, width: '100%', margin: 'auto' }}>
      <Skeleton variant="rectangular" height={140} sx={{ marginBottom: 1 }} />
      <Skeleton variant="text" sx={{ fontSize: '1.2rem', marginBottom: 0.5 }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    </Box>
  );
}

export default Loader;