import React, { useEffect, useState } from 'react'
import Category from '../../component/category/Category'
import axios from 'axios';
import Products from '../../component/products/Products';

function Home() {
 
  return (
  <>
    <Category />
    <Products />
    </>
  )
}

export default Home