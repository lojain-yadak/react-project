import React from 'react';
import Navbar from '../component/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../component/footer/Footer';
import { Container } from '@mui/material';
import CartContextProvider from '../context/CartContext';
import { useLocation } from 'react-router';
import Hero from '../component/hero/Hero';
import Forthcmop from '../component/forthcomponent/Forthcmop';
import Fifthcomponent from '../component/fifthcomponent/Fifthcomponent';
import Sixcomponent from '../component/sixthcomponent/Sixcomponent';

function Mainlayout() {
  const location = useLocation();
  const hiddenRoutes = ['/checkout'];
  const hideLayout = hiddenRoutes.includes(location.pathname);

  
  const showHero = location.pathname === '/';

  return (
    <>
      <CartContextProvider>
        {!hideLayout && <Navbar />}
        
       
        {showHero && <Hero />}
        
        <Container>
          <Outlet />
        </Container>
         {showHero && <Forthcmop />}
         {showHero && <Fifthcomponent />}
         {showHero && <Sixcomponent />}
        {!hideLayout && <Footer />}
      </CartContextProvider>
    </>
  );
}

export default Mainlayout;