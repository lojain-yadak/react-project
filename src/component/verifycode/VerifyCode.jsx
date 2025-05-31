import React from 'react';
import {
  TextField,
  Box,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function VerifyCode() {
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
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
    console.log("Form Data:", data); // Debug log

    setLoading(true);
    setError('');

    try {
      const response = await axios.patch(
        'http://mytshop.runasp.net/api/Account/SendCode',
        {
          email,
          code: data.code,
          password: data.password,
          ConfirmPassword: data.confirmPassword,
        }
      );

      console.log('Server Response:', response);

      if (response.status === 200) {
        navigate('/login'); // Redirect to login after successful reset
      }

    } catch (err) {
      console.error('Verification failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to verify code or reset password.');
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

      {/* Verification Code Field */}
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

      {/* New Password Field */}
      <TextField
        {...register('password', {
          required: 'New password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
        })}
        type="password"
        label="New Password"
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {/* Confirm Password Field using Controller */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: 'Confirm password is required',
          validate: (value) => value === watch('password') || 'Passwords do not match',
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label="Confirm Password"
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        )}
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