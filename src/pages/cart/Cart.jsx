import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, CardMedia, Paper, Card, CardContent, IconButton, Button } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import Loader from '../../component/shared/loder/Loader';
import { Link } from 'react-router';
import axiosAuth from '../../api/AxiosAutontication';

function Cart() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [totalPrice, setTotalPrice ] = useState(0);
  const [totalItemes, setTotalItems ] = useState(0);
  let test=0;
  const getProductFromCart = async () => {
    try{
    const response = await axiosAuth.get(`/Carts`);

      console.log(response);
      setProducts(response.data?.cartResponse || []);
      setTotalPrice(response.data.totalPrice);
      response.data.cartResponse.forEach((product)=>{
        test = test +product.count;
      });
      setTotalItems(test)
      setLoader(false);

    } catch (error) {
      console.error('Error fetching cart:', error);
      setProducts([]);
      setLoader(false);
    }
  };
const increaseQty= async (id)=>{
  const token = localStorage.getItem("userToken");
  const response = await axios.patch(`https://mytshop.runasp.net/api/Carts/increaseCount/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } );
   const updateProduct = products.map ((product)=>{
    if(product.id == id){
      return {...product,count:product.count+1};
    }else{
      return product;
    }
   });
   setProducts(updateProduct);
}
const decreaseQty= async (id)=>{
  const token = localStorage.getItem("userToken");
  const response = await axios.patch(`https://mytshop.runasp.net/api/Carts/decreaseCount/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } );
   let updateProduct = products.map ((product)=>{
    if(product.id == id){
      return {...product,count:product.count-1};
    }else{
      return product;
    }
   }).filter((product)=>{
    return product.count>0;
   })
   setProducts(updateProduct);
}
const deleteItem = async (id) => {
  const token = localStorage.getItem("userToken");

  try {
    await axios.delete(`https://mytshop.runasp.net/api/Carts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setProducts(products.filter(product => product.id !== id));

  } catch (error) {
    console.error('Error deleting item:', error);
    alert('Failed to delete item. Please try again.');
  }
};
const clearCart = async () => {
  const token = localStorage.getItem("userToken");

  try {
    await axios.delete(
      `https://mytshop.runasp.net/api/Carts/clearCart`, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setProducts([]);

  } catch (error) {
    console.error('Failed to clear cart:', error);
    alert('Could not clear cart. Please try again.');
  }
};
  useEffect(() => {
    getProductFromCart();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <Box >
      <Typography variant='h2' gutterBottom>
        Shopping Cart
      </Typography>
       <Box sx={{ mb: 2 }}>
      <Button
        variant="contained"
        color="error"
        onClick={clearCart}
        disabled={products.length === 0}
      >
        Clear Cart
      </Button>
    </Box>
      <Grid spacing={4} container>
        <Grid item xs={12} md={8}>
          {products.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            products.map((product) => (
              <Card key={product.id} sx={{ textAlign: 'center', p: 2, mb: 2, display: 'flex' }}>
                <CardMedia
                  component={'img'}
                  image='https://placehold.co/10' 
                  alt={product.name}
                  sx={{ borderRadius: 2 }}
                />
                <CardContent>
                  <Typography variant='h3'>{product.name}</Typography>
                  <Typography variant='h4' color='primary'>{product.price}</Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={()=>decreaseQty(product.id)}><Remove /></IconButton>
                  <Typography>{product.count}</Typography>
                  <IconButton onClick={()=>increaseQty(product.id)}><Add /></IconButton>
                  <IconButton color='error' onClick={()=>deleteItem(product.id)}><Delete /></IconButton>
                </Box>
              </Card>
            ))
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography>Order Summary</Typography>
          <Card sx={{p:2}}>
            <Typography>
            Total items: {totalItemes}
          </Typography>
          <Typography>
            Total Price: {totalPrice}$
          </Typography>
          </Card>
          <Button variant='contained' fullWidth component={Link} to='/checkout'> Press To Checkout </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart;

