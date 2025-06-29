import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Container } from '@mui/material';
import style from './products.module.css'
import { Link } from 'react-router';
import Loader from '../shared/loder/Loader';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
function Products() {
  const fetchCategories = async ()=>{
  const {data} = await axios.get(`https://mytshop.runasp.net/api/products`);
  return data;
 }
 const {data,isLoading,error,isError}= useQuery({
  queryKey: ['products'],
  queryFn: fetchCategories,
  staleTime:6*60*60*1000,
  refetchOnWindowFocus:false,
 });
 if(isError) return <p>error is: {error.message}</p>;
 if(isLoading) return <Loader />;
   
  return (
    <>
    <hr></hr>
    <Typography>
      PRODUCTS
    </Typography>
    <Grid container spacing={4} className={`${style.section}`}>
    {
        data.map( (product)=>
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
        viewTransition
        >Details</Button>
      </CardActions>
    </Card>
         </Grid>
     )
    }
    </Grid>
    </>
    
  )
}

export default Products