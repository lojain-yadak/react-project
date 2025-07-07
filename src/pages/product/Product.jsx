import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';

// MUI Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { toast, Bounce } from 'react-toastify';
import Loader from './../../component/shared/loder/Loader';
import { CartContext } from '../../context/CartContext';

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
  const { cartItems, setCartItems } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [reviewRate, setReviewRate] = useState(0);
const [reviewComment, setReviewComment] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
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

  useEffect(() => {
    getProduct();
  }, [id]);
const submitReview = async () => {
  const userToken = localStorage.getItem("userToken");

  if (!userToken) {
    toast.info("Please log in to leave a review", {
      position: "bottom-center",
      autoClose: 3000,
      theme: "dark"
    });
    return;
  }

  if (!product || !product.id) {
    toast.error("Invalid product.");
    return;
  }

  if (reviewRate < 1 || reviewRate > 5) {
    toast.warn("Please select a rating between 1 and 5.", {
      position: "bottom-center",
      autoClose: 3000,
      theme: "dark"
    });
    return;
  }

  if (!reviewComment.trim()) {
    toast.warn("Please write a comment.", {
      position: "bottom-center",
      autoClose: 3000,
      theme: "dark"
    });
    return;
  }

  setIsSubmitting(true);

  try {
    await axios.post(
      `https://mytshop.runasp.net/api/products/ ${product.id}/Reviews/Create`,
      {
        Rate: reviewRate,
        Comment: reviewComment.trim()
      },
      {
        headers: {
          AUTHORIZATION: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    setReviewRate(0);
    setReviewComment('');
    getProduct(); // Refresh product to include new review

    toast.success('Thank you for your review!', {
      position: "bottom-center",
      autoClose: 2000,
      theme: "dark",
      transition: Bounce,
    });

  } catch (err) {
    console.error('Submit Review Error:', {
      message: err.message,
      response: err.response?.data
    });

    const errorMessage = err.response?.data?.message || err.message;

    toast.error(`Failed to submit review: ${errorMessage}`, {
      position: "bottom-center",
      autoClose: 2000,
      theme: "dark",
      transition: Bounce,
    });
  } finally {
    setIsSubmitting(false);
  }
};
  const addToCart = async (productId) => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      toast.info("Please log in to add to cart", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }

    try {
      await axios.post(
        `https://mytshop.runasp.net/api/Carts/ ${productId}`,
        {},
        {
          headers: {
            AUTHORIZATION: `Bearer ${userToken}`
          }
        }
      );

      setCartItems(prev => prev + 1);

      toast.success('Added to cart!', {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });

    } catch (err) {
      console.error(err);
      toast.error('Failed to add to cart', {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found.</div>;

  const imageUrl = product.mainImg?.startsWith('http')
    ? product.mainImg
    : `https://mytshop.runasp.net/images/products/ ${product.mainImg}`;

  return (
    <Card
      sx={{
        maxWidth: 1200,
        margin: 'auto',
        padding: 3,
        mt: 4,
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        src={imageUrl}
        alt={product.description || 'Product image'}
        sx={{
          width: 'auto',
          height: 300,
          objectFit: 'contain',
          margin: '0 auto',
          display: 'block'
        }}
      />

      <CardContent className='text-center'>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          ${product.price}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Rating:</Typography>
          <Rating
            name="dynamic-rating"
            value={product.rate || 0}
            readOnly
            precision={1}
            size="large"
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Average Rating: {product.rate?.toFixed(1)} ({product.reviews?.length || 0} review{product.reviews?.length !== 1 ? 's' : ''})
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
  <Typography variant="h6" gutterBottom>
    Write a Review
  </Typography>

  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Typography variant="subtitle2" sx={{ mr: 1 }}>
      Your Rating:
    </Typography>
    <Rating
      name="review-rating"
      value={reviewRate}
      onChange={(event, newValue) => setReviewRate(newValue)}
      precision={1}
      size="medium"
    />
  </Box>

  <textarea
    value={reviewComment}
    onChange={(e) => setReviewComment(e.target.value)}
    placeholder="Write your review here..."
    rows={4}
    style={{
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      resize: 'vertical',
      fontSize: '1rem'
    }}
  />

  <Button
    variant="contained"
    style={{backgroundColor:'#5fc9cf'}}
    onClick={submitReview}
    disabled={isSubmitting}
    sx={{ mt: 2 }}
  >
    {isSubmitting ? 'Submitting...' : 'Submit Review'}
  </Button>
</Box>
        <Box sx={{ mt: 2, textAlign: 'left', width: '100%' }}>
          <Typography variant="subtitle1">Colors</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            {(product.colors || ['#000', '#FFC107', '#00BCD4', '#3F51B5']).map((color, index) => (
              <ColorChip key={index} color={color} />
            ))}
          </Box>
        </Box>
        {product.reviews && product.reviews.length > 0 ? (
          <Box sx={{ mt: 4, borderTop: '1px solid #ddd', pt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Customer Reviews
            </Typography>

            {product.reviews.map((review, index) => (
              <Box key={index} sx={{ mb: 3, borderBottom: '1px solid #eee', pb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {review.reviewerName || 'Anonymous'}
                  </Typography>
                  <Typography variant="caption">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <Rating
                  name={`review-rating-${index}`}
                  value={review.rate || 0}
                  readOnly
                  precision={1}
                  size="small"
                  sx={{ my: 1 }}
                />

                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {review.comment}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="textSecondary">
              No reviews yet. Be the first to review!
            </Typography>
          </Box>
        )}
      </CardContent>

  
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => addToCart(product.id)}
          fullWidth
          startIcon={<ShoppingCartOutlinedIcon />}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;