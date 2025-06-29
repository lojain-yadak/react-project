import React from 'react';
import {
  TextField,
  InputAdornment,
  Box,
  Button,
  Typography,
  InputLabel,
} from '@mui/material';
import style from './register.module.css';
import { AccountCircle } from '@mui/icons-material';
import { AlternateEmail, Password, CalendarMonth } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router';

function Register() {
  const { register, handleSubmit } = useForm();

  const registerUser = async (values) => {
    try {
      const response = await axios.post(
        'https://mytshop.runasp.net/api/Account/register ',
        values
      );
      console.log(response);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create New Account
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Join us to track orders, save favorites, and get special offers.
      </Typography>

      <Box component="form" className={style.generalStyle} onSubmit={handleSubmit(registerUser)}  
      sx={{
    backgroundColor: 'background.paper', 
    p: 3,
    borderRadius: 2,
    boxShadow: 1,
    maxWidth: 600,
    margin: 'auto',
  }}>
        {/* First Name & Last Name on same row */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="firstName-input" className={style.customLabel}>
              First Name
            </InputLabel>
            <TextField
              {...register('firstName')}
              id="firstName-input"
              type="text"
              placeholder="First name"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <InputLabel htmlFor="lastName-input" className={style.customLabel}>
              Last Name
            </InputLabel>
            <TextField
              {...register('lastName')}
              id="lastName-input"
              type="text"
              placeholder="Last name"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </Box>
        </Box>

        {/* Username */}
        <InputLabel htmlFor="userName-input" className={style.customLabel}>
              User Name
            </InputLabel>
        <TextField
          {...register('userName')}
         placeholder='user name'
          type="text"
          fullWidth
          sx={{ mb: 2 }}
          
        />

        {/* Email */}
        <InputLabel htmlFor="email-input" className={style.customLabel}>
             Email Address
            </InputLabel>
        <TextField
          {...register('email')}
          placeholder="user email"
          type="email"
          fullWidth
          sx={{ mb: 2 }}
          
        />

        {/* Password */}
        <InputLabel htmlFor="password-input" className={style.customLabel}>
              Password
            </InputLabel>
        <TextField
          {...register('password')}
          placeholder="Password"
          type="password"
          fullWidth
          sx={{ mb: 2 }}

        />

        {/* Confirm Password */}
        <InputLabel htmlFor="confirm-input" className={style.customLabel}>
              Confirm Password
            </InputLabel>
        <TextField
          {...register('confirmPassword')}
          placeholder="confirmation password"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          
        />

        {/* Date of Birth */}
        <InputLabel htmlFor="date-input" className={style.customLabel}>
              Birth Of Date
            </InputLabel>
        <TextField
          {...register('birthOfDate')}
          placeholder="birth of date"
          type="date"
          fullWidth
          sx={{ mb: 2 }}
         
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, py: 1,backgroundColor:'#4fc4ca',color:'#312d5f',textTransform: 'none'}}>
          Create New Account
        </Button>
       <Typography
  variant="body2"
  align="center"
  sx={{ mt: 2 }}
>
  Already Have an Account?{' '}
  <Link to="/login" style={{ color: '#00B4D8', textDecoration: 'none' }}>
    Login
  </Link>
</Typography>
      </Box>
    </>
  );
}

export default Register;