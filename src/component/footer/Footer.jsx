import React from 'react';
import styles from './Footer.module.css';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Circle } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
function Footer() {
  return (
    <footer className={styles.container} style={{backgroundColor:'#121212'}}>
      <div className={`${styles.item} `}>
        <h2 style={{color:'white'}} className='ms-3'>Follow Us</h2>
        <Box>
         <Button component={Link} to={`https://www.instagram.com/eknowledge.learn/`} className=' p-4 border ms-4' sx={{borderRadius:'160px'}} > <InstagramIcon /> </Button> 
         <Button component={Link} to={``} className=' p-4 border ms-4' sx={{borderRadius:'160px'}} > <PinterestIcon /> </Button> 
         <Button component={Link} to={``} className=' p-4 border ms-4' sx={{borderRadius:'160px'}} > <TwitterIcon /> </Button> 
         <Button component={Link} to={`mailto:tariqshreem11@gmail.com`} className=' p-4 border ms-4' sx={{borderRadius:'160px'}} > <EmailIcon /> </Button> 

        </Box>
      </div>
      <div className={styles.item}>
        <h2 style={{color:'white'}}>Our Product</h2>
        <Box className='d-flex flex-column g-2 align-items-start'>
          <Button>All Products</Button>
          <Button>Laptops</Button>
          <Button>Headphones</Button>
          <Button>Smartphones</Button>
          <Button>PlayStation</Button>
          <Button>SmartWatch</Button>
        </Box>
      </div>
      <div className={styles.item}>
        <h2 style={{color:'white'}}>Links</h2>
         <Box className='d-flex flex-column g-2 align-items-start'>
          <Button>Terms & Conditions</Button>
          <Button>Privacy & Policy</Button>
          <Button>Refund & Return Policy</Button>
         </Box>
      </div>
      <div className={styles.item}>
          <h2 style={{color:'white'}}>Site Pages</h2>
         <Box className='d-flex flex-column g-2 align-items-start'>
          <Button component={Link} to='/'>HomePage</Button>
          <Button>About KA Store</Button>
          <Button component={Link} to='/products'>Shop</Button>
          <Button>Contact Us</Button>
         </Box>
      </div>
      <div className={`${styles.item} container w-100`}>
        <hr className='container' style={{color:'white'}}></hr>
     <div className={styles.container}>
     <div className={styles.item}>
      <h3 className='fs-5' style={{color:'white'}}>Sunday to Thursday </h3>
      <h4 className='fs-6' style={{color:'white'}}>09 AM - 07 PM</h4>
     </div>
     <div className={`${styles.item} `}>
         <Button component={Link} to={`tel:+970 594 956 962`} className=' p-4 border ms-4' sx={{borderRadius:'160px'}} > <LocalPhoneIcon /> </Button> 
         <Button component={Link} to={`mailto:tariqshreem11@gmail.com`} className=' p-4 border ms-4' sx={{borderRadius:'160px'}} > <EmailIcon /> </Button> 
         <Button className=" text-white  flex items-center p-2 rounded-pill ms-3" style={{backgroundColor:'gray' }}>
      
         <Button style={{backgroundColor:'lightgray',borderRadius:'50%'}} className='p-3 me-3'><LocationOnIcon /> </Button>      
      <span>Location</span>
    </Button>
     </div>
     <div className={styles.item1} style={{color:'white'}}>KA Store © 2025 | All Rights Reserved</div>
     </div>

      </div>
    </footer>
  );
}

export default Footer;