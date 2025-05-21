import React from 'react'
import Navbar from './../component/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../component/footer/Footer';

function MainLayout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default MainLayout