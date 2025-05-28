import React from 'react'
import Navbar from './../component/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../component/footer/Footer';
import {Container} from '@mui/material'

function MainLayout() {
  return (
    <>
    <Navbar />
    <Container>
    <Outlet />
    </Container>
    <Footer />
    </>
  )
}

export default MainLayout