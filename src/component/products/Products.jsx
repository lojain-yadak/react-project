import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Container, Rating, TextField, FormControl, Select, MenuItem, Box, InputLabel } from '@mui/material';
import Star from '@mui/icons-material/Star';
import style from './products.module.css';
import { Link } from 'react-router-dom';
import Loader from '../shared/loder/Loader';
import { useQuery } from '@tanstack/react-query';
import axiosAuth from '../../api/AxiosAutontication';

function Products() {
  const fetchCategories = async () => {
    const { data } = await axiosAuth.get(`/products`);
    return data;
  };

  const {
    data,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchCategories,
    staleTime: 6 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const [filters, setFilters] = React.useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'default',
  });

  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <Loader />;

  const productList = data?.data || [];

  // Filtering
  const filteredProducts = productList.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesMinPrice = filters.minPrice === '' || product.price >= parseFloat(filters.minPrice);
    const matchesMaxPrice = filters.maxPrice === '' || product.price <= parseFloat(filters.maxPrice);
    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  /// Sorting
  const sortedProducts = [...filteredProducts];

  if (filters.sortBy === 'newest') {
    sortedProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (filters.sortBy === 'oldest') {
    sortedProducts.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }


  return (
    <>
      <hr />
      <Typography variant="h4" gutterBottom>
        PRODUCTS
      </Typography>

      {/* Filter UI */}
      <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          label="Search by name"
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          size="small"
          sx={{ minWidth: 200 }}
        />

        <TextField
          label="Min Price"
          type="number"
          value={filters.minPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
          size="small"
          sx={{ minWidth: 120 }}
        />

        <TextField
          label="Max Price"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
          size="small"
          sx={{ minWidth: 120 }}
        />

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            value={filters.sortBy}
            label="Sort By"
            onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={4} className={style.section}>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <Grid item key={product.id} size={{ xs: 12, md: 4, sm: 6, lg: 4, xl: 3 }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.mainImg}
                  alt={product.description}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography>
                    {product.rate} <Star style={{ color: 'gold' }} />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={`/product/${product.id}`}
                  >
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No products match your filters.</Typography>
        )}
      </Grid>
    </>
  );
}

export default Products;