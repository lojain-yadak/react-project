import React, { useState, useEffect } from 'react';
import {
  TextField,
  Box,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function VerifyCode() {
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(10); // 5 minutes
  const navigate = useNavigate();

  const email = localStorage.getItem('resetEmail');

  // Prevent access if no email is found
  useEffect(() => {
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No email found. Please start over.',
      });
      navigate('/forgot-password', { replace: true });
    }
  }, [email, navigate]);

  // Countdown effect
  useEffect(() => {
    let interval;
    if (secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.patch(
        'https://mytshop.runasp.net/api/Account/SendCode ',
        {
          email,
          code: data.code,
          password: data.password,
          ConfirmPassword: data.confirmPassword,
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Your password has been successfully changed.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/login');
        });
      }
    } catch (err) {
      console.error('Verification failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to verify code or reset password.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email not found. Please start over.',
      });
      navigate('/forgot-password');
      return;
    }

    if (secondsRemaining > 0) return; // Prevent click while timer active

    try {
      Swal.fire({
        title: 'Sending code...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(
        'https://mytshop.runasp.net/api/Account/SendCode ',
        { email }
      );

      Swal.fire({
        icon: 'success',
        title: 'Code Sent!',
        text: 'A new verification code has been sent to your email.',
      });

      setSecondsRemaining(300); // Reset timer
    } catch (err) {
      console.error('Failed to resend code:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to resend verification code. Please try again later.',
      });
    }
  };

  const isTimerActive = secondsRemaining > 0;

  return (
    <Box
      component="form"
      sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h6" color="primary">
        Step 2
      </Typography>
      <Typography variant="h5" gutterBottom>
        Enter Verification Code
      </Typography>
      <Typography variant="body2" color="text.secondary">
        We have sent OTP code via email address to{' '}
        <strong>{email ? email.replace(/(.{2})(.*?)(@.*)/, '$1***$3') : ''}</strong>, please enter it below to reset your password.
      </Typography>

      {/* Timer Display */}
      <Typography variant="body2" color="warning.main" align="center" sx={{ mt: 2 }}>
        Resend code available in {formatTime(secondsRemaining)}
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
        sx={{ mt: 2, textTransform: 'none' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Verify Code'}
      </Button>

      <Box textAlign="center" mt={2}>
        <Typography
          component="span"
          onClick={isTimerActive ? undefined : handleResendCode}
          sx={{
            color: isTimerActive ? 'gray' : '#1976d2',
            cursor: isTimerActive ? 'not-allowed' : 'pointer',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': {
              textDecoration: isTimerActive ? 'none' : 'underline',
            },
          }}
        >
          Resend verification code
        </Typography>
      </Box>
    </Box>
  );
}

export default VerifyCode;