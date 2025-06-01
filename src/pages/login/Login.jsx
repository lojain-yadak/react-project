import React from 'react'
import {TextField,InputAdornment,Box, Button} from '@mui/material'
import style from './login.module.css'
import {AccountCircle} from '@mui/icons-material';
import {AlternateEmail} from '@mui/icons-material';
import {Password} from '@mui/icons-material';
import {CalendarMonth} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Swal from './../../../node_modules/sweetalert2/src/sweetalert2';


function Login() {
  const {register,handleSubmit} = useForm();

  const loginUser= async (values)=>{
const response = await axios.post(`http://mytshop.runasp.net/api/Account/Login`, values);
localStorage.setItem("userToken",response.data.token)
console.log(response);
  }
  return (
    <Box component={'form'} className={style.generalStyle}
     onSubmit={handleSubmit(loginUser)}>
    
      
        
        <TextField
        {...register("email")}
         type='email'
          label="User Email"
          id="outlined-start-adornment"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AlternateEmail />
              </InputAdornment>,
            },
          }}
        />
        <TextField
        {...register("password")}
         type='password'
          label="User Password"
          id="outlined-start-adornment"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <Password />
              </InputAdornment>,
            },
          }}
        />
       
       
        <Button type='submit' variant='outlined'>Login</Button>
        </Box>
  )
}

export default Login