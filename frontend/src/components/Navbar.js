import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';
import './Navbar.css';

const Navbar = () => {
  const currentDateTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2C2C3E', padding: 1 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Box className="search-box" sx={{ mr: 2, borderRadius: 4, boxShadow: 'inset 2px 2px 5px #1E1E2F, inset -2px -2px 5px #2E2E42' }}>
            <InputBase
              placeholder="Search..."
              sx={{ paddingLeft: 2, paddingRight: 2, color: '#FFF' }}
              startAdornment={<Search sx={{ color: '#FFF' }} />}
            />
          </Box>
          <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            Analytics Dashboard
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" noWrap component="div" sx={{ mr: 3 }}>
            {currentDateTime}
          </Typography>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
