import React, { useState } from 'react';
import { TextField, InputAdornment, Box, Button, CircularProgress, Typography, InputLabel } from '@mui/material';
import style from './login.module.css';
import { AlternateEmail, Password } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';

function Login() {
  const { register, handleSubmit, formState:{errors} } = useForm({mode:'onChange'});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // <-- Loading state

  const loginUser = async (values) => {
    setLoading(true); // <-- Start loading
    try {
      const response = await axios.post(`https://mytshop.runasp.net/api/Account/Login`,  values);
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

      navigate('/', {replace:true});
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
      setLoading(false); // <-- Stop loading
    }
  };

  return (
    <>
     <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Good to see you again!
      </Typography>

    <Box component={'form'} className={style.generalStyle} onSubmit={handleSubmit(loginUser)}
     sx={{
    backgroundColor: 'background.paper', // Uses theme value
    p: 3,
    borderRadius: 2,
    boxShadow: 1,
    maxWidth: 500,
    margin: 'auto',
  }}
    >
      <InputLabel htmlFor="email-input" className={style.customLabel}>
              Email Address
            </InputLabel>
      <TextField
        {...register("email" ,{
          required:"Email Is Required",
          
          pattern:{
            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message:"Enter a valid email address "
          }

        }
        
      )}
       
        type='text'
        placeholder="User Email"
        id="email-input"
        sx={{ m: 1 }}
        fullWidth
       
        helperText={errors.email?.message}
        error={errors.email}
      />
      <InputLabel htmlFor="password-input" className={style.customLabel}>
             Password
            </InputLabel>
      <TextField
        {...register("password",{
          required:"Password Is Required"
        }
        )}
        type='password'
        placeholder="User Password"
        id="password-input"
        sx={{ m: 1 }}
        fullWidth
        helperText={errors.password?.message}

        error={errors.password}

      />
         <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2 }}
        >
          Already Have an Account?{' '}
          <Link to="/forgetpassword" style={{ color: '#00B4D8', textDecoration: 'none' }}>
            Reset Password
          </Link>
        </Typography>
      <Button
        type='submit'
        variant='outlined'
        disabled={loading}
        sx={{ m: 1 ,textTransform:'none'}}
        endIcon={
          loading ? <CircularProgress color="inherit" size={20} /> : null
        }
      >
        {loading ? 'Logging In...' : 'Login'}
      </Button>
       <Typography
  variant="body2"
  align="center"
  sx={{ mt: 2 }}
>
  Don't Have an Account?{' '}
  <Link to="/register" style={{ color: '#00B4D8', textDecoration: 'none' }}>
    Create Account
  </Link>
</Typography>
    </Box>
    </>
  );
}

export default Login;