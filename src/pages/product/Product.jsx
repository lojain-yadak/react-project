import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from './../../component/shared/loder/Loader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Bounce, toast } from 'react-toastify';
import { CartContext } from '../../context/CartContext';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// Styled color chip for color options
const ColorChip = ({ color }) => (
  <Chip
    sx={{
      width: 24,
      height: 24,
      borderRadius: '50%',
      backgroundColor: color,
      margin: 0.5,
    }}
    variant="outlined"
  />
);

function Product() {
  const { cartItems, setCartItems } = React.useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProduct = async () => {
    try {
      const response = await axios.get(`https://mytshop.runasp.net/api/products/ ${id}`);
      setProduct(response.data);
    } catch (err) {
      setError('Failed to fetch product details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (id) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const response = await axios.post(
        `https://mytshop.runasp.net/api/Carts/ ${id}`,
        {},
        {
          headers: {
            AUTHORIZATION: `Bearer ${userToken}`
          }
        }
      );
      setCartItems(cartItems + 1);
      toast.success('Added successfully!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch {
      toast.error('Failed to add to cart', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleRatingChange = async (event, newValue) => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      toast.info("Please log in to rate this product", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }

    try {
      await axios.post(
        `https://mytshop.runasp.net/api/Ratings/ ${product.id}`,
        { rating: newValue },
        {
          headers: {
            AUTHORIZATION: `Bearer ${userToken}`
          }
        }
      );

      // Refresh product data to get updated rating
      getProduct();

      toast.success('Thank you for rating!', {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });

    } catch (err) {
      console.error(err);
      toast.error('Failed to submit rating', {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <Card sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }} className='d-flex flex-column align-items-center'>
      {/* Product Image */}
      <CardMedia
        component="img"
        image={product.mainImg}
        alt={product.description || 'Product image'}
        sx={{
          width: 'auto',
          height: 300,
          objectFit: 'contain',
          margin: '0 auto',
          display: 'block'
        }}
      />

      {/* Product Info */}
      <CardContent className='text-center'>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          ${product.price}
        </Typography>

        {/* Rating & Reviews */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 1 }}>Rate</Typography>
            <Rating
              name="interactive-rating"
              value={product.rating || 0}
              precision={1}
              onChange={handleRatingChange}
              size="small"
            />
            <Typography variant="body1" sx={{ ml: 1 }}>{product.rating?.toFixed(1)}</Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{ marginLeft: 'auto', color: 'primary.main', cursor: 'pointer' }}
          >
            Reviews ({product.reviewCount || 0})
          </Typography>
        </Box>

        {/* Colors Section */}
        <Box sx={{ mt: 2, textAlign: 'left', width: '100%' }}>
          <Typography variant="subtitle1">Colours</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            {(product.colors || ['#000', '#FFC107', '#00BCD4', '#3F51B5']).map((color, index) => (
              <ColorChip key={index} color={color} />
            ))}
          </Box>
        </Box>
      </CardContent>

      {/* Add to Cart Button */}
      <CardActions>
        <Button size="small" color="primary" onClick={() => addToCart(product.id)}>
          <ShoppingCartOutlinedIcon /> +
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;