import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container } from '@mui/material';
import style from './products.module.css'
import { Link } from 'react-router';
import Loader from '../shared/loder/Loader';
import useFetch from '../../hooks/useFetch';
function Products() {
   const {error,data:products,isLoading}= useFetch(`https://mytshop.runasp.net/api/products`);
  if(error) return <p>{error.message}</p> ;
  if(isLoading) return <Loader />;
  
   
  return (
    <Grid container spacing={4} className={`${style.section}`}>
    {
        products.map( (product)=>
         <Grid item size={{xs:12, md:4,sm:6 ,lg:4,xl:3}} key={product.id}>
            <Card sx={{ maxWidth: 345 }}>
        <CardMedia
        sx={{ height: 140 }}
        component={'img'}
        image={`${product.mainImg}`}
        alt={product.description}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"
        component={Link}
        to={`/product/${product.id}`}
        >Learn More</Button>
      </CardActions>
    </Card>
         </Grid>
     )
    }
    </Grid>
    
  )
}

export default Products