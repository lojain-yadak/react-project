import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Grid, Container } from '@mui/material';
import style from './category.module.css';
import Loader from '../shared/loder/Loader';
import { useQuery } from '@tanstack/react-query';

function Category() {
 const fetchCategories = async ()=>{
  const {data} = await axios.get(`https://mytshop.runasp.net/api/categories`);
  return data;
 }
 const {data,isLoading,error,isError}= useQuery({
  queryKey: ['categories'],
  queryFn: fetchCategories,
  staleTime:6*60*60*1000,
  refetchOnWindowFocus:false,
 });
 if(isError) return <p>error is: {error.message}</p>;
 if(isLoading) return <Loader />;
  return (
    <>
    <Typography>
      CATEGORIES
    </Typography>
    <Grid container spacing={4} className={`${style.section}`}>
      {data.map((category) => (
        <Grid item size={{ xs: 12, md: 4, sm: 6, lg: 4, xl: 3 }} key={category.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              component="img"
              image={category.mainImg}
              alt={category.description}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {category.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
}

export default Category;