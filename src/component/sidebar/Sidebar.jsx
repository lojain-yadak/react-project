import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <List>
      <ListItem button component={Link} to="/profile/info">
        <ListItemText primary="Info" />
      </ListItem>
      <ListItem button component={Link} to="change-password">
        <ListItemText primary="Change Password" />
      </ListItem>
      <ListItem button component={Link} to="orders">
        <ListItemText primary="Orders" />
      </ListItem>
    </List>
  );
}