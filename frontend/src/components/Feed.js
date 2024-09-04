import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';

const Navbar = () => {
  const currentDateTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#2C2C3E', padding: 1 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box
              className="search-box"
              sx={{ mr: 2, borderRadius: 4, boxShadow: 'inset 2px 2px 5px #1E1E2F, inset -2px -2px 5px #2E2E42' }}
            >
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

      {/* New Container Segment */}
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#F5F5F5' }}>
        <Box
          sx={{
            width: '170px',
            height: '130px',
            backgroundColor: '#1976d2',
            borderRadius: '8px',
            margin: '10px',
            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px) scale(1.05)',
            },
          }}
        ></Box>
        <Box
          sx={{
            width: '170px',
            height: '130px',
            backgroundColor: '#1976d2',
            borderRadius: '8px',
            margin: '10px',
            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px) scale(1.05)',
            },
          }}
        ></Box>
      </Box>
    </>
  );
};

export default Navbar;
