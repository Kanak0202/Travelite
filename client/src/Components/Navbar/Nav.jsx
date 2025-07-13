import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Avatar, Tooltip, Container, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PlaceIcon from '@mui/icons-material/Place';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useSelector } from 'react-redux';
import { DataContext } from '../../context/DataProvider';

const Nav = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { account, setAccount } = useContext(DataContext);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsUserLoggedIn(!!account.email);
  }, [account]);

  const handleLogout = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}/logout`, {
      method: "POST",
      credentials: 'include'
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    setAccount({ email: "", name: "" });
    localStorage.clear();
    navigate("/");
  };

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const getFirstName = () => {
    const spaceIndex = account.name.indexOf(" ");
    return spaceIndex !== -1 ? account.name.substring(0, spaceIndex) : account.name;
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setIsDrawerOpen(open);
  };

  return (
    <AppBar position="static" style={{ background: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}
          >
            Travelite
          </Typography>

          {/* Mobile Drawer Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            <IconButton size="large" onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/')}>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/explore')}>
                      <ListItemText primary="Explore" />
                    </ListItemButton>
                  </ListItem>
                  {isUserLoggedIn && (
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => navigate('/add')}>
                        <ListItemText primary="Add Destination" />
                      </ListItemButton>
                    </ListItem>
                  )}
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/contact')}>
                      <ListItemText primary="Review Us" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={() => navigate('/')} sx={{ my: 2, color: 'white' }}>Home</Button>
            <Button onClick={() => navigate('/explore')} sx={{ my: 2, color: 'white' }}>Explore</Button>
            {isUserLoggedIn && <Button onClick={() => navigate('/add')} sx={{ my: 2, color: 'white' }}>Add Destination</Button>}
            <Button onClick={() => navigate('/contact')} sx={{ my: 2, color: 'white' }}>Review Us</Button>
          </Box>

          {/* Profile / Login Section */}
          {isUserLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{getFirstName()[0]}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => navigate(`/profile/${account.userId}`)}>
                  <AccountBoxIcon sx={{ mr: 1 }} /> My Profile
                </MenuItem>
                <MenuItem onClick={() => navigate(`/my-uploads/${account.userId}`)}>
                  <RateReviewIcon sx={{ mr: 1 }} /> My Uploads
                </MenuItem>
                <MenuItem onClick={() => navigate('/places-visited')}>
                  <PlaceIcon sx={{ mr: 1 }} /> Places Visited
                </MenuItem>
                <MenuItem>
                  <EmojiEventsIcon sx={{ mr: 1 }} /> My Points: {user?.user.rewardPoints}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button onClick={() => navigate('/login')} sx={{ color: 'white' }}>Login</Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
