import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { CartContext } from '../../context/CartContext';
import { ThemeContext } from '../../context/ThemeContext';
import { DarkMode, LightMode } from '@mui/icons-material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const pagesGuest = ['Login', 'Register'];
const pagesAuth = ['Cart', 'Home'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const { cartItems } = React.useContext(CartContext);
  const { mode, toggleTheme } = React.useContext(ThemeContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false); // For right-side drawer
  const navigate = useNavigate();
  const isLogedIn = Boolean(localStorage.getItem("userToken"));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate('/login');
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/profile/info">
          <ListItemText primary="Info" />
        </ListItem>
        <ListItem button component={Link} to="/profile/change-password">
          <ListItemText primary="Change Password" />
        </ListItem>
        <ListItem button component={Link} to="/profile/orders">
          <ListItemText primary="Orders" />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#4FC4CA' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo - Desktop */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src="/logo/Ka.svg" alt="Ka store" />
            </Typography>

            {/* Mobile Menu Button */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {(isLogedIn ? pagesAuth : pagesGuest).map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={`${page}`}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Mobile Logo */}
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src="/logo/Ka.svg" alt="Ka store" />
            </Typography>

            {/* Desktop Navigation Links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {(isLogedIn ? pagesAuth : pagesGuest).map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={`${page}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  {page === 'Cart' ? `Cart(${cartItems})` : page}
                </Button>
              ))}
              {isLogedIn && (
                <Button onClick={handleLogout} sx={{ my: 2, color: 'black', display: 'block' }}>
                  Logout
                </Button>
              )}
            </Box>

            {/* Right Section: Theme Toggle + Avatar */}
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={toggleTheme}>
                {mode === 'light' ? <DarkMode /> : <LightMode />}
              </IconButton>
              <Tooltip title="Open profile">
                <IconButton onClick={toggleDrawer(true)} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Slide-in Drawer from Right */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </>
  );
}

export default Navbar;