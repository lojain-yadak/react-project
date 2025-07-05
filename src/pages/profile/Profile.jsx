// /src/pages/profile/Profile.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Profile() {
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={3}>
          {/* Sidebar */}
          <Box
            component="nav"
            sx={{
              borderRight: '1px solid #ddd',
              pr: 2,
            }}
          >
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li>
                <a href="/profile/info">Info</a>
              </li>
              <li>
                <a href="/profile/change-password">Change Password</a>
              </li>
              <li>
                <a href="/profile/orders">Orders</a>
              </li>
            </ul>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
          {/* Content Area */}
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}