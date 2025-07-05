import { Box, Button, Typography, TextField, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Sixcomponent() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`https://mytshop.runasp.net/api/Account/Login`, values);
      localStorage.setItem("userToken", response.data.token);

      toast.success('Logged in successfully', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      navigate('/', { replace: true });
    } catch (error) {
      toast.error('Invalid Email Or Password', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
  className="d-flex flex-column justify-content-center align-items-center" 
  sx={{ py: 5 }} 
  style={{
    backgroundImage: "url('./public/forthcompimages/Ellipse 13.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: 'auto',
    padding: '60px 0',
    backgroundColor:'#9E97E1'
  }}>
      <Typography variant="h3" gutterBottom style={{color:'#16123F'}} className='fw-bolder'>
        Subscribe Don't Miss a Deal
      </Typography>
      <Typography variant="body1" align="center" color="#312D5F" className='fw-bold' paragraph>
        Sign up for the latest discounts, offers, and shopping trends.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(loginUser)}
        noValidate
        sx={{
          backgroundColor: 'none',
          p: 3,
          maxWidth: 500,
          width: '100%',
          margin: 'auto',
        }}
      >
        <InputLabel htmlFor="email-input" shrink style={{color:'#312D5F'}}>
          Email Address
        </InputLabel>
        <TextField
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address"
    }
  })}
  type="email"
  placeholder="Your Email"
  id="email-input"
  fullWidth
  margin="normal"
  error={!!errors.email}
  helperText={errors.email?.message}
  sx={{
    mb: 2,
    '& .MuiInputBase-input': {
      color: '#312D5F', // 👈 Text color inside input
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#312D5F', // 👈 Border color
      },
      '&:hover fieldset': {
        borderColor: '#312D5F',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#312D5F',
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#312D5F',
      opacity: 1,
    },
  }}
/>

        <InputLabel htmlFor="password-input" shrink style={{color:'#312D5F'}}>
          Password
        </InputLabel>
        <TextField
          {...register("password", {
            required: "Password is required"
          })}
          type="password"
          placeholder="Your Password"
          id="password-input"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
         sx={{
    mb: 2,
    '& .MuiInputBase-input': {
      color: '#312D5F', // 👈 Text color inside input
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#312D5F', // 👈 Border color
      },
      '&:hover fieldset': {
        borderColor: '#312D5F',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#312D5F',
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#312D5F',
      opacity: 1,
    },
  }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{
            mt: 2,
            py: 1.5,
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 2
          }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </Box>
    </Box>
  );
}

export default Sixcomponent;