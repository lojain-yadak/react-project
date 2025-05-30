import React from 'react';
import {
  TextField,
  Box,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('New password:', data.newPassword);
    // TODO: Send to backend API
  };

  return (
    <Box
      component="form"
      sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Reset Password
      </Typography>

      <TextField
        {...register('newPassword', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Minimum 6 characters',
          },
        })}
        label="New Password"
        type="password"
        fullWidth
        margin="normal"
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
      />

      <TextField
        {...register('confirmPassword', {
          required: 'Please confirm your password',
        })}
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" fullWidth>
        Change Password
      </Button>

      <Box textAlign="center" mt={2}>
        <Link to="/verify-code" style={{ textDecoration: 'none' }}>
          Back to Code
        </Link>
      </Box>
    </Box>
  );
}