import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

export default function Info() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('userToken');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('https://mytshop.runasp.net/api/Account/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
          console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user data:', err);

        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem('userToken');
          navigate('/login');
        } else {
          setError('Failed to load user information.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          User Info
        </Typography>
         <Typography><strong>First Name: </strong> {user.firstName}</Typography>
        <Typography><strong>Last Name: </strong> {user.lastName}</Typography>
        <Typography><strong>Name:</strong> {user.userName}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Date of Birth:</strong> {user.birthOfDate}</Typography>
        <Typography><strong>Gender: </strong> {user.gender}</Typography>
      </CardContent>
    </Card>
  );
}