import React, { useEffect, useState } from 'react'
import Category from '../../component/category/Category';
import axios from 'axios';
import Products from '../../component/products/Products';
import { Box } from '@mui/material';
import Sixcomponent from '../../component/sixthcomponent/Sixcomponent';
import Hero from '../../component/hero/Hero';

function Home() {
 
  return (
  <>
    
    <Category />
    <Products />
   

  </>
  )
}

export default Home