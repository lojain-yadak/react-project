import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from './../../component/shared/loder/Loader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Bounce, toast } from 'react-toastify';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProduct = async () => {
    try {
      const response = await axios.get(`https://mytshop.runasp.net/api/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      setError('Failed to fetch product details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

const addToCart=async (id)=>{
    const userToken = localStorage.getItem("userToken");
    try{const response = await axios.post(`https://mytshop.runasp.net/api/Carts/${id}`, {},
        {
            headers:{
                AUTHORIZATION:`Bearer ${userToken}`
            }
        }

    );
console.log(response);
 toast.success('added successfully', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

}catch{
   toast.error('added unsuccessfully', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
  
}
    
};

  
  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${product.mainImg}`}
          alt={`${product.description}`|| 'Product image'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={()=>addToCart(product.id)}>
          add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;