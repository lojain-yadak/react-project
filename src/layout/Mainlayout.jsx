import React from 'react';
import Navbar from '../component/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../component/footer/Footer';
import { Container } from '@mui/material';
import CartContextProvider from '../context/CartContext';
import { useLocation } from 'react-router';
import Hero from '../component/hero/Hero';

function MainLayout() {
  const location = useLocation();
  const hiddenRoutes = ['/checkout'];
  const hideLayout = hiddenRoutes.includes(location.pathname);

  // Only show Hero on the homepage
  const showHero = location.pathname === '/';

  return (
    <>
      <CartContextProvider>
        {!hideLayout && <Navbar />}
        
        {/* Show Hero only on homepage */}
        {showHero && <Hero />}
        
        <Container>
          <Outlet />
        </Container>

        {!hideLayout && <Footer />}
      </CartContextProvider>
    </>
  );
}

export default MainLayout;