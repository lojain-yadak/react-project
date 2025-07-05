import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

export default function Changepassword() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const newPassword = watch('newPassword'); // For confirming password match

  const onSubmit = async (data) => {
    const { oldPassword, newPassword } = data;

    setLoading(true);

    try {
      const token = localStorage.getItem('userToken');

      const response = await axios.patch(
        'https://mytshop.runasp.net/api/Account/ChangePassword ',
        {
          OldPassword: oldPassword,
          NewPassword: newPassword,
          ConfirmNewPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Password changed successfully!', {
        autoClose: 3000,
      });

    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Failed to change password.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
      {/* Old Password */}
      <TextField
        label="Old Password"
        type="password"
        {...register('oldPassword', {
          required: 'Old password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        fullWidth
        required
        error={!!errors.oldPassword}
        helperText={errors.oldPassword?.message}
        sx={{ mb: 2 }}
      />

      {/* New Password */}
      <TextField
        label="New Password"
        type="password"
        {...register('newPassword', {
          required: 'New password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        fullWidth
        required
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
        sx={{ mb: 2 }}
      />

      {/* Confirm New Password */}
      <TextField
        label="Confirm New Password"
        type="password"
        {...register('confirmNewPassword', {
          required: 'Please confirm your new password',
          validate: (value) =>
            value === newPassword || 'Passwords do not match',
        })}
        fullWidth
        required
        error={!!errors.confirmNewPassword}
        helperText={errors.confirmNewPassword?.message}
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
      >
        {loading ? 'Changing...' : 'Change Password'}
      </Button>
    </Box>
  );
}