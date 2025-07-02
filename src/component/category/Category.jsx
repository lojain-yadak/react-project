import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Loader from '../shared/loder/Loader';
import { useQuery } from '@tanstack/react-query';
import axiosAuth from '../../api/AxiosAutontication';

function Category() {
  const fetchCategories = async () => {
    const { data } = await axiosAuth.get('/categories'); 
    return data;
  };

  const {
    data,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 6 * 60 * 60 * 1000, // 6 hours
    refetchOnWindowFocus: false,
  });

  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <Loader />;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        CATEGORIES
      </Typography>
      <Grid container spacing={4}>
        {data.map((category) => (
          <Grid
            item
            xs={12}
            md={4}
            sm={6}
            lg={4}
            xl={3}
            key={category.id}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                component="img"
                image={category.mainImg}
                alt={category.description || 'Category image'}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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