import React from 'react';
import {
  TextField,
  InputAdornment,
  Box,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { AlternateEmail } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Forgetpassword() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        'http://mytshop.runasp.net/api/Account/ForgotPassword',
        {
          email: data.email,
        }
      );

      if (response.status === 200) {
        setSuccess('Verification code sent to your email.');
        reset(); // Clear input

        setTimeout(() => {
          localStorage.setItem('resetEmail', data.email); // Save email
          navigate('/verify-code'); // Go to next step
        }, 1500);
      }
    } catch (err) {
      setError('Failed to send reset code. Please check the email and try again.');
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
        Forgot Password
      </Typography>

      <TextField
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Enter a valid email address',
          },
        })}
        type="email"
        label="Email Address"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail />
              </InputAdornment>
            ),
          },
        }}
      />

      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {success && (
        <Typography color="success.main" align="center" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}

      <Button
  type="submit"
  variant="contained"
  fullWidth
  disabled={loading}
  sx={{ mt: 2 }}
>
  {loading ? <CircularProgress size={24} /> : 'Send Reset Code'}
</Button>

      <Box textAlign="center" mt={2}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          Back to Login
        </Link>
      </Box>
    </Box>
  );
}

export default Forgetpassword;