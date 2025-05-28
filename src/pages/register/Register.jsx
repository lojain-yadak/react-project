import React from 'react'
import {TextField,InputAdornment,Box, Button} from '@mui/material'
import style from './register.module.css'
import {AccountCircle} from '@mui/icons-material';
import {AlternateEmail} from '@mui/icons-material';
import {Password} from '@mui/icons-material';
import {CalendarMonth} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Register() {
  const {register,handleSubmit} = useForm();

  const registerUser= async (values)=>{
const response = await axios.post(`http://mytshop.runasp.net/api/Account/register`, values);
console.log(response);
  }
  return (
    <Box component={'form'} className={style.generalStyle}
     onSubmit={handleSubmit(registerUser)}>
    <TextField
    {...register("firstName")}
     type='text'
          label="User first Name"
          id="outlined-start-adornment"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>,
            },
          }}
        />
        <TextField
        {...register("lastName")}
        type='text'
          label="User last Name"
          id="outlined-start-adornment"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>,
            },
          }}
        />
        <TextField
        {...register("userName")}
         type='text'
          label="User Name"
          id="outlined-start-adornment"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>,
            },
          }}
        />
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
        <TextField
        {...register("confirmPassword")}
         type='password'
          label="Confirmation Password"
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
        <TextField
         {...register("birthOfDate")}
         type='date'
          label="Birth of date"
          id="outlined-start-adornment"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <CalendarMonth />
              </InputAdornment>,
            },
          }}
        />
        <Button type='submit' variant='outlined'>Register</Button>
        </Box>
  )
}

export default Register