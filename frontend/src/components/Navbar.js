import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box } from '@mui/material';
import { Search, Notifications, AccountCircle, AccessTime } from '@mui/icons-material'; // Added AccessTime for clock icon
import './Navbar.css';

const Navbar = () => {
  const currentDateTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2C2C3E', padding: 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '96%' }}>
        
        {/* Left Side: Search Box and Analytics Dashboard */}
        <Box className="navbar-left" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box className="search-box" sx={{ mr: 2, borderRadius: 4, boxShadow: 'inset 2px 2px 5px #1E1E2F, inset -2px -2px 5px #2E2E42' }}>
            <InputBase
              placeholder="Search..."
              sx={{ paddingLeft: 0, paddingRight: 0, color: '#FFF' }}
              startAdornment={<Search sx={{ color: '#FFF' }} />}
            />
          </Box >
          <Typography variant="h4" noWrap component="div" className="navbar-title" 
          sx={{ paddingTop: 8 }}>
            Analytics Dashboard
          </Typography>
        </Box>

        {/* Right Side: Icons and Date/Time */}
        <Box className="navbar-right" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
          <Box className="datetime-container" sx={{ display: 'flex', alignItems: 'center', paddingTop: 8 }}>
            <AccessTime sx={{ color: '#A3A3B3', mr: 1 }} /> {/* Clock Icon */}
            <Typography variant="body2" noWrap component="div" className="navbar-datetime">
              {currentDateTime}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
