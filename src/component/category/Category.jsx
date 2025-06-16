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

function Category() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://mytshop.runasp.net/api/categories`); 
      setCategories(response.data);
      setError(null); // reset error if any
    } catch (err) {
      setError(err.response?.status || 'Something went wrong');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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