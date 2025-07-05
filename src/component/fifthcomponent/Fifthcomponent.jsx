import { Box } from '@mui/joy'
import React from 'react'
import { Button, Card, Typography } from '@mui/material';
import applewatch from '/public/forthcompimages/Rectangle 64.png'
import airpods from '/public/forthcompimages/Rectangle 64 (1).png'
function Fifthcomponent() {
  return (
    <>
    <Box className="d-flex flex-wrap justify-content-around gap-3 py-3">
  
  <Card className="d-flex flex-column flex-md-row align-items-center justify-content-between" style={{ width: '100%', maxWidth: '600px',backgroundColor:'#4FC4CA' }}>
    <Box className="p-4 ">
      <h2 className="fw-bolder text-dark">Apple Watch</h2>
      <p className="fw-light text-secondary">
        Stay on top of your day - Apple Watch, your perfect companion for health, fitness, and staying connected. Be present in every moment.
      </p>
      <Button style={{ backgroundColor: 'white', color: '#121212', borderRadius: '12px' }}>Buy Now</Button>
    </Box>
    <Typography component="img"
      src={applewatch}
      alt='smart watch'
      className="w-50 w-md-25"
    />
  </Card>

  <Card className="d-flex flex-column flex-md-row align-items-center justify-content-between " style={{ width: '100%', maxWidth: '600px',backgroundColor:'#4FC4CA' }}>
    <Box className="p-4">
      <h2 className="fw-bolder text-dark">AirPods Pro 2</h2>
      <p className="fw-light text-secondary">
        Enjoy the freedom of real wireless audio for long hours and less charging. AirPods: The sound of innovation.
      </p>
      <Button style={{ backgroundColor: 'white', color: '#121212', borderRadius: '12px' }}>Buy Now</Button>
    </Box>
    <Typography component="img"
      src={airpods}
      alt='airpods'
      className="w-50 w-md-25"
    />
  </Card>
</Box>
    </>
  )
}

export default Fifthcomponent