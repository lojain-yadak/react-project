import React from 'react'
import Navbar from '../component/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../component/footer/Footer';
import {Container} from '@mui/material'
import CartContextProvider from '../context/CartContext';

function MainLayout() {
  return (
    <>
    <CartContextProvider>
    <Navbar />
    <Container>
    <Outlet />
    </Container>
    <Footer />
     </CartContextProvider>
    </>
  )
}

export default MainLayout