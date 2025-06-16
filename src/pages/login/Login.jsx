import React, { useState } from 'react';
import { TextField, InputAdornment, Box, Button, CircularProgress } from '@mui/material';
import style from './login.module.css';
import { AlternateEmail, Password } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

      navigate('/home');
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
    <Box component={'form'} className={style.generalStyle} onSubmit={handleSubmit(loginUser)}>
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
        label="User Email"
        id="outlined-start-adornment"
        sx={{ m: 1 }}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail />
              </InputAdornment>
            ),
          },
        }}
        helperText={errors.email?.message}
        error={errors.email}
      />
      <TextField
        {...register("password",{
          required:"Password Is Required"
        }
        )}
        type='password'
        label="User Password"
        id="outlined-start-adornment"
        sx={{ m: 1 }}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Password />
              </InputAdornment>
            ),
          },
        }}
        helperText={errors.password?.message}

        error={errors.password}

      />

      <Button
        type='submit'
        variant='outlined'
        disabled={loading}
        sx={{ m: 1 }}
        endIcon={
          loading ? <CircularProgress color="inherit" size={20} /> : null
        }
      >
        {loading ? 'Logging In...' : 'Login'}
      </Button>
    </Box>
  );
}

export default Login;