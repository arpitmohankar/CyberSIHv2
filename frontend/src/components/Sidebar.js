import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Divider, Box, Typography } from '@mui/material';
import { Home, ExpandLess, ExpandMore, Dashboard, Article, Support, HelpOutline, LocalPolice } from '@mui/icons-material';
import './Sidebar.css';
import './Articles.js';

const Sidebar = () => {
  const [openFeatures, setOpenFeatures] = useState(false);

  const handleFeaturesClick = () => {
    setOpenFeatures(!openFeatures);
  };

  const handleRedirect = () => {
    window.location.href = 'tel:155260'; // Indian Cyber Crime Helpline Number
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 260, boxSizing: 'border-box', backgroundColor: '#1E1E2F', color: '#FFFFFF', boxShadow: '3px 0 10px rgba(0, 0, 0, 0.5)' },
      }}
    >
      <Box className="sidebar-header" sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
        <Typography variant="h6" noWrap component="div" className="sidebar-title">
          Cyber Security
        </Typography>
      </Box>
      <Divider className="sidebar-divider" />
      <List className="sidebar-list">
        <ListItem button component={Link} to="/" className="sidebar-item">
          <ListItemIcon>
            <Home className="sidebar-icon" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={handleFeaturesClick} className="sidebar-item">
          <ListItemIcon>
            <Dashboard className="sidebar-icon" />
          </ListItemIcon>
          <ListItemText primary="Features" />
          {openFeatures ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openFeatures} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/incidents" sx={{ pl: 4 }} className="sidebar-subitem">
              <ListItemIcon>
                <LocalPolice className="sidebar-icon" />
              </ListItemIcon>
              <ListItemText primary="Incidents" />
            </ListItem>
            <ListItem button component={Link} to="/visualization" sx={{ pl: 4 }} className="sidebar-subitem">
              <ListItemIcon>
                <Dashboard className="sidebar-icon" />
              </ListItemIcon>
              <ListItemText primary="View Visualization" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button component={Link} to="/Services" className="sidebar-item">
          <ListItemIcon>
            <Support className="sidebar-icon" />
          </ListItemIcon>
          <ListItemText primary="Services" />
        </ListItem>

        <ListItem button component={Link} to="/Articles">
          <ListItemIcon>
            <Article className="sidebar-icon" />
          </ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItem>

        <ListItem button component={Link} to="/Laws">
          <ListItemIcon>
            <LocalPolice className="sidebar-icon" />
          </ListItemIcon>
          <ListItemText primary="Laws" />
        </ListItem>

        <ListItem button onClick={handleRedirect} className="sidebar-item">
          <ListItemIcon>
            <HelpOutline className="sidebar-icon" />
          </ListItemIcon>
          <ListItemText primary="Help Support" />
        </ListItem>

        <ListItem button component={Link} to="/Chatbot" className="sidebar-item">
          <ListItemIcon>
            <HelpOutline className="sidebar-icon" />
          </ListItemIcon>
          <ListItemText primary="FAQs" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
