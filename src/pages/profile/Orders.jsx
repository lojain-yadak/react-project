import React, { useEffect, useState } from 'react';
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

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem('userToken');
        const res = await axios.get('https://mytshop.runasp.net/api/Orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Validate and transform the data
        const validatedOrders = res.data.map((order) => ({
          ...order,
          date: new Date(order.date), // Convert to Date object
        }));

        setOrders(validatedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }

    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedOrderId) {
      async function fetchOrderDetails() {
        try {
          const token = localStorage.getItem('userToken');
          const res = await axios.get(`https://mytshop.runasp.net/api/Orders/${selectedOrderId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOrderDetails(res.data);
        } catch (err) {
          console.error("Error fetching order details:", err);
        }
      }

      fetchOrderDetails();
    }
  }, [selectedOrderId]);

  const handleOpen = (orderId) => {
    setSelectedOrderId(orderId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrderId(null);
    setOrderDetails(null);
  };

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
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {order.date instanceof Date && !isNaN(order.date)
                    ? order.date.toLocaleDateString()
                    : "No Date Available"}
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleOpen(order.id)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {orderDetails && (
            <div>
              <p><strong>Status:</strong> {orderDetails.status}</p>
              <p><strong>Total:</strong> ${orderDetails.total}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {orderDetails.items.map(item => (
                  <li key={item.id}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
        <Button onClick={handleClose}>Close</Button>
      </Dialog>
    </>
  );
}