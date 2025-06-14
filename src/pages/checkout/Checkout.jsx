import { Box, Card, FormControl, FormControlLabel, RadioGroup, Typography, Divider, Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import axios from 'axios';
import React, { useState } from 'react';

function Checkout() {
  const [paymentmethod, setPaymentMethod] = useState('Visa');
  const [loading, setLoading] = useState(false);

  const handlePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlepay = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `http://mytshop.runasp.net/api/CheckOuts/Pay`,
        {
          PaymentMethod: paymentmethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if( paymentmethod == 'Visa'){
          location.href=response.data.url
      }
      
      console.log(response);
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Card sx={{ p: 4 }}>
        <Typography variant='h2' sx={{ fontWeight: 300 }}>
          Checkout
        </Typography>

        <Divider sx={{ my: 2 }} />

        <FormControl>
          <Typography variant='h3' sx={{ fontWeight: '300', mb: 2 }}>
            Select Payment Method
          </Typography>
          <RadioGroup
            defaultValue={paymentmethod}
            name="payment-method"
            onChange={handlePaymentMethod}
          >
            <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
            <FormControlLabel value="Cash" control={<Radio />} label="Cash on delivery" />
          </RadioGroup>
        </FormControl>

        <Button
          onClick={handlepay}
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Processing...' : 'Confirm Payment'}
        </Button>

        {/* Optional: Show selected method */}
        <Typography sx={{ mt: 2 }}>
          Selected: <strong>{paymentmethod}</strong>
        </Typography>
      </Card>
    </Box>
  );
}

export default Checkout;