
import { Box, Typography } from '@mui/material'
import React from 'react'

function Forthcmop() {
  return (
    <Box style={{backgroundColor:'#C0BAFC',display:'flex',flexWrap:'wrap',gap:'10px'  }} className='p-3 justify-content-around'>
        <Typography component={'img'}
        style={{width:'45%'}}
        src='./public/forthcompimages/Frame 2085664002.png'
        alt='hear it and share it'
        >
            
        </Typography>
        <Typography component={'img'}
        style={{width:'45%'}}
        src='./public/forthcompimages/Frame 42.png'
        ></Typography>

    </Box>
  )
}

export default Forthcmop