import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import laptops from '/public/forthcompimages/laptops.jpg';
import Loader from '../shared/loder/Loader';
import { useQuery } from '@tanstack/react-query';
import axiosAuth from '../../api/AxiosAutontication';
import { Link } from 'react-router-dom'; // 👈 Import Link

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

      {/* Horizontal Scroll Container */}
      <Box
        sx={{
          width: '100%',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          py: 1,
          paddingLeft: '16px',
          paddingRight: '16px',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}
      >
        {/* Map categories horizontally */}
        {data.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}/products`} // 👈 Navigate to product list
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '160px',
                textAlign: 'center',
              }}
            >
              <Card
                sx={{
                  borderRadius: '50%',
                  boxShadow: 3,
                  mb: 1,
                }}
              >
                <CardMedia
                  component="img"
                  image={category.mainImg || laptops}
                  alt={category.description || 'Category image'}
                  sx={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    padding: '10px',
                    bgcolor: '#E6E3FF',
                  }}
                />
              </Card>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                sx={{ color: 'white', mt: 1 }}
              >
                {category.name}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </>
  );
}

export default Category;