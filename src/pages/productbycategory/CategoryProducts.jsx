import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosAuth from '../../api/AxiosAutontication';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import Loader from '../../component/shared/loder/Loader';

function CategoryProducts() {
  const { categoryId } = useParams();

  const fetchProductsByCategory = async () => {
    const { data } = await axiosAuth.get(`/categories/${categoryId}/products`);
    
    // Debugging logs
    console.log('Full API Response:', data);
    
    return data;
  };

  const {
    data,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['categoryProducts', categoryId],
    queryFn: fetchProductsByCategory,
    staleTime: 6 * 60 * 60 * 1000,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading products: {error.message}</p>;

  // Safely get product list
  const productList = Array.isArray(data) ? data : [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Products in Category {categoryId}
      </Typography>

      {productList.length > 0 ? (
        <Grid container spacing={3}>
          {productList.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.mainImg}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No products found in this category.</Typography>
      )}
    </Box>
  );
}

export default CategoryProducts;