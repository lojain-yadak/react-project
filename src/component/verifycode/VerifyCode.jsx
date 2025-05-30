import React from 'react';
import {
  TextField,
  Box,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function VerifyCode() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const email = localStorage.getItem('resetEmail');

  // Prevent access if no email is found
  React.useEffect(() => {
    if (!email) {
      navigate('/forgot-password', { replace: true });
    }
  }, [email, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.patch(
        'http://mytshop.runasp.net/api/Account/SendCode',
        {
          email,
          code: data.code,
        }
      );

      console.log('Server Response:', response);

      if (response.status === 200) {
        navigate('/reset-password'); // ✅ Only redirect if server says OK
      }

    } catch (err) {
      console.error('Verification failed:', err.response?.data || err.message);
      setError('Invalid or expired code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Enter Verification Code
      </Typography>

      <TextField
        {...register('code', {
          required: 'Verification code is required',
          minLength: {
            value: 4,
            message: 'Code must be 4 digits',
          },
          maxLength: {
            value: 4,
            message: 'Code must be exactly 4 digits',
          },
          pattern: {
            value: /^[0-9]{4}$/,
            message: 'Only numbers allowed',
          },
        })}
        label="Verification Code"
        fullWidth
        margin="normal"
        error={!!errors.code}
        helperText={errors.code?.message}
      />

      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Verify Code'}
      </Button>

      <Box textAlign="center" mt={2}>
        <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
          Back to Email
        </Link>
      </Box>
    </Box>
  );
}

export default VerifyCode;