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
import style from './category.module.css';
import Loader from '../shared/loder/Loader';
import useFetch from '../../hooks/useFetch';

function Category() {
 const {error,data:categories,isLoading}= useFetch(`https://mytshop.runasp.net/api/categories`);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h5" color="error">
          Failed to load categories: {error}
        </Typography>
        <Button onClick={getCategories} variant="contained" color="primary">
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Grid container spacing={4} className={`${style.section}`}>
      {categories.map((category) => (
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
  );
}

export default Category;