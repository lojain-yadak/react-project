import React, { useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';

// Assume this is already configured with base URL and auth header
import axiosAuth from '../../api/AxiosAutontication'; // Check if this file exists

export default function Orders() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch all orders
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await axiosAuth.get('/Orders');
      console.log(res.data); // Log the raw response
      return res.data.map(order => ({
        ...order,
        orderDate: new Date(order.orderDate), // Convert to Date object
      }));
    },
  });

  // Fetch order details if ID is selected
  const {
    data: orderDetails = null,
    isLoading: loadingDetails,
  } = useQuery({
    queryKey: ['order', selectedOrderId],
    queryFn: async () => {
      const res = await axiosAuth.get(`/Orders/${selectedOrderId}`);
      return res.data;
    },
    enabled: !!selectedOrderId,
  });

  const handleOpen = (orderId) => {
    setSelectedOrderId(orderId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrderId(null);
  };

  if (isLoading) return <div>Loading orders...</div>;
  if (isError) return <div>Error fetching orders: {error.message}</div>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    {order.orderDate instanceof Date && !isNaN(order.orderDate)
                      ? order.orderDate.toLocaleDateString()
                      : "No Date Available"}
                  </TableCell>
                  <TableCell>{order.orderStatus}</TableCell> {/* Use orderStatus */}
                  <TableCell align="right">
                    <Button onClick={() => handleOpen(order.id)}>View</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {loadingDetails ? (
            <p>Loading details...</p>
          ) : orderDetails ? (
            <div>
              <p><strong>Status: </strong> {orderDetails.orderStatus}</p> {/* Use orderStatus */}
              <p><strong>Total: </strong> ${orderDetails.totalPrice.toFixed(2)}</p> {/* Use totalPrice */}
              <p><strong>payment method: </strong>${orderDetails.paymentMethodType}</p>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </DialogContent>
        <Button onClick={handleClose}>Close</Button>
      </Dialog>
    </>
  );
}