import React from 'react';
import {
  TextField,
  InputAdornment,
  Box,
  Button,
  Typography,
  CircularProgress,
  InputLabel,
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
        'https://mytshop.runasp.net/api/Account/ForgotPassword',
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
      <Typography sx={{
        color:'#312D5F'
      }}>
        Step 1
      </Typography>
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant='p' sx={{
        fw:400,
        color:'#717171'
      }}>
     Please enter your email address and we’ll send you a recovery code.
      </Typography>
       <InputLabel htmlFor="email-input" >
             Email Address
         </InputLabel>
      <TextField
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Enter a valid email address',
          },
        })}
        type="email"
        placeholder="Email Address"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
       
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
  sx={{ mt: 2,textTransform:'none' }}
>
  {loading ? <CircularProgress size={24} /> : 'Send Reset Code'}
</Button>

   <Typography
    variant="body2"
    align="center"
    sx={{ mt: 2 }}
  >
    Remembered your Password?{' '}
    <Link to="/login" style={{ color: '#00B4D8', textDecoration: 'none' }}>
      Login
    </Link>
  </Typography>
    </Box>
  );
}

export default Forgetpassword;