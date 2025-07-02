import React from 'react';
import { Box, Grid, Typography, CardMedia, Card, CardContent, IconButton, Button } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import axios from 'axios';
import Loader from '../../component/shared/loder/Loader';
import { Link } from 'react-router';
import axiosAuth from '../../api/AxiosAutontication';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Cart = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("userToken");

  // Fetch cart data
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axiosAuth.get('/Carts');
      return response.data?.cartResponse || [];
    }
  });

  // Calculate totals
  const totalPrice = products.reduce((sum, product) => sum + (product.price * product.count), 0);
  const totalItems = products.reduce((sum, product) => sum + product.count, 0);

  // Increase Quantity Mutation
  const increaseQty = useMutation({
    mutationFn: (id) =>
      axios.patch(`https://mytshop.runasp.net/api/Carts/increaseCount/ ${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries(['cart']);
      const previousCart = queryClient.getQueryData(['cart']);
      const newCart = previousCart.map(p =>
        p.id === id ? { ...p, count: p.count + 1 } : p
      );
      queryClient.setQueryData(['cart'], newCart);
      return { previousCart };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['cart'], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['cart']);
    }
  });

  // Decrease Quantity Mutation
  const decreaseQty = useMutation({
    mutationFn: (id) =>
      axios.patch(`https://mytshop.runasp.net/api/Carts/decreaseCount/ ${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries(['cart']);
      const previousCart = queryClient.getQueryData(['cart']);
      const newCart = previousCart
        .map(p => (p.id === id ? { ...p, count: Math.max(1, p.count - 1) } : p))
        .filter(p => p.count > 0);
      queryClient.setQueryData(['cart'], newCart);
      return { previousCart };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['cart'], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['cart']);
    }
  });

  // Delete Item Mutation
  const deleteItem = useMutation({
    mutationFn: (id) =>
      axios.delete(`https://mytshop.runasp.net/api/Carts/ ${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries(['cart']);
      const previousCart = queryClient.getQueryData(['cart']);
      const newCart = previousCart.filter(p => p.id !== id);
      queryClient.setQueryData(['cart'], newCart);
      return { previousCart };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['cart'], context.previousCart);
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Failed to remove product.' });
    },
    onSuccess: () => {
      Swal.fire({ icon: 'success', title: 'Removed!', text: 'Product removed from cart.', timer: 1500, showConfirmButton: false });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['cart']);
    }
  });

  // Clear Cart Mutation
  const clearCart = useMutation({
    mutationFn: () =>
      axios.delete(`https://mytshop.runasp.net/api/Carts/clearCart `, {
        headers: { Authorization: `Bearer ${token}` }
      }),
    onMutate: async () => {
      await queryClient.cancelQueries(['cart']);
      const previousCart = queryClient.getQueryData(['cart']);
      queryClient.setQueryData(['cart'], []);
      return { previousCart };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['cart'], context.previousCart);
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Failed to clear cart.' });
    },
    onSuccess: () => {
      Swal.fire({ icon: 'success', title: 'Cart cleared!', timer: 1500, showConfirmButton: false });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['cart']);
    }
  });

  if (isLoading) return <Loader />;
  if (error) return <Typography color="error">Error loading cart: {error.message}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => clearCart.mutate()}
          disabled={products.length === 0}
        >
          <RemoveShoppingCartOutlinedIcon /> Clear Cart
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {products.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  textAlign: 'center',
                  p: 2,
                  mb: 2,
                  display: 'flex',
                  width: 750,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <CardMedia
                  component="img"
                  image={'https://placehold.co/100 '}
                  alt={product.name}
                  sx={{ borderRadius: 2, width: 110 }}
                />

                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    flexGrow: 1,
                    minWidth: 0
                  }}
                >
                  <Typography variant="h6" noWrap>{product.name}</Typography>
                  <Typography variant="body2" noWrap>{product.Description}</Typography>
                  <Typography variant="h6" color="primary">${product.price}</Typography>
                </CardContent>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <IconButton onClick={() => decreaseQty.mutate(product.id)} title="Decrease quantity">
                    <Remove />
                  </IconButton>
                  <Typography>{product.count}</Typography>
                  <IconButton onClick={() => increaseQty.mutate(product.id)} title="Increase quantity">
                    <Add />
                  </IconButton>
                  <IconButton color="error" title="Delete item" onClick={() => deleteItem.mutate(product.id)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="primary" title="Add to favorite">
                    <FavoriteBorderOutlinedIcon />
                  </IconButton>
                </Box>
              </Card>
            ))
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6">Order Summary</Typography>
          <Card sx={{ p: 2 }}>
            <Typography>Total Items: {totalItems}</Typography>
            <Typography>Total Price: ${totalPrice.toFixed(2)}</Typography>
          </Card>
          <Button
            variant="contained"
            fullWidth
            component={Link}
            to="/checkout"
            sx={{ mt: 2 }}
          >
            Proceed to Checkout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;