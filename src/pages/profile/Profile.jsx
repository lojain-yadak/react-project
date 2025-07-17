import React from 'react';
import { Link, Outlet } from 'react-router-dom';
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
                <Link to="/profile/info" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Info
                </Link>
              </li>
              <li>
                <Link to="/profile/change-password" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Change Password
                </Link>
              </li>
              <li>
                <Link to="/profile/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Orders
                </Link>
              </li>
            </ul>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}