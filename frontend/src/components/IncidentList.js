import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Box,
  IconButton,
  Chip,
  List,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';
import { Language, Security, Money, Warning } from '@mui/icons-material';

// Import and register necessary elements from chart.js
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ErrorAlert = ({ message }) => (
  <Alert severity="error" sx={{ animation: 'shake 0.3s ease-in-out' }}>
    <AlertTitle>Error</AlertTitle>
    {message}
  </Alert>
);

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/scrape');
        setIncidents(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching incidents');
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getCategoryCounts = () => {
    const counts = {};
    incidents.forEach((incident) => {
      counts[incident.category] = (counts[incident.category] || 0) + 1;
    });
    return counts;
  };

  // Use a palette of light, professional colors
  const lightColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#66FF66', '#FF6666',
    '#66B2FF', '#FFB266', '#B266FF', '#66FFB2',
    '#FF66B2', '#B2FF66'
  ];

  const chartData = {
    labels: Object.keys(getCategoryCounts()),
    datasets: [
      {
        label: 'Incident Categories',
        data: Object.values(getCategoryCounts()),
        backgroundColor: lightColors,
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const containerStyles = {
    backgroundColor: '#1b1b1b',
    padding: '1rem',
    color: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.5)',
    transform: 'translateZ(0)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateZ(15px)',
      boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.7)',
    },
    height: '100%', // Ensures equal height for both containers
  };

  const cardStyles = {
    backgroundColor: '#272727',
    color: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0px 7px 20px rgba(0, 0, 0, 0.4)',
    transform: 'translateZ(0)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateZ(10px)',
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.6)',
    },
  };

  const contentAreaStyles = {
    flexGrow: 1,
    padding: '1rem',
    backgroundColor: '#202020',
    borderRadius: '12px',
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.5)',
    animation: 'fadeIn 1s ease-in-out',
    overflowY: 'auto',
  };

  const pieChartStyles = {
    backgroundColor: '#e0e0e0',
    borderRadius: '12px',
    padding: '1.5rem', // Increased padding for a larger Pie Chart
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    marginBottom: '2rem',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="secondary" sx={{ animation: 'spin 1s linear infinite' }} />
      </Box>
    );
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100vh', gap: '1rem', padding: '1rem' }}>
      {/* Category List */}
      <Box sx={containerStyles} width={{ xs: '100%', md: '25%' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#ffcc00' }}>
          Categories
        </Typography>
        <List>
          {[
            { name: 'Fraud', icon: <Warning /> },
            { name: 'Scam', icon: <Warning /> },
            { name: 'Server', icon: <Security /> },
            { name: 'Money', icon: <Money /> },
            { name: 'Hacked', icon: <Security /> },
            { name: 'Laundering', icon: <Money /> },
            { name: 'Sextortion', icon: <Warning /> },
            { name: 'Threats', icon: <Warning /> },
            { name: 'Database', icon: <Security /> },
            { name: 'Data Breach', icon: <Security /> },
          ].map((category) => (
            <ListItemButton
              key={category.name}
              onClick={() => handleCategoryClick(category.name.toLowerCase())}
              sx={{
                backgroundColor: '#333333',
                borderRadius: '8px',
                marginBottom: '0.5rem',
                color: '#ffffff',
                ':hover': {
                  backgroundColor: '#444444',
                  color: '#ffcc00',
                },
              }}
            >
              <ListItemText primary={category.name} />
              <Box component="span" sx={{ marginLeft: '1rem' }}>
                {category.icon}
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Content Area */}
      <Box sx={contentAreaStyles} width={{ xs: '100%', md: '75%' }}>
        {/* Pie Chart */}
        {selectedCategory === null && (
          <Box sx={pieChartStyles}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: '1rem', color: '#333333' }}>
              Incident Categories Overview
            </Typography>
            <Pie data={chartData} />
          </Box>
        )}

        {/* Incident Grid */}
        <Grid container spacing={3}>
          {selectedCategory
            ? incidents
                .filter((incident) => incident.category === selectedCategory)
                .map((incident, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card raised sx={cardStyles}>
                      <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#ffcc00' }}>
                          {incident.title || 'Untitled Incident'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ color: '#cccccc' }}>
                          {incident.text.length > 200
                            ? `${incident.text.substring(0, 200)}...`
                            : incident.text}
                        </Typography>
                        {incident.image && (
                          <Box textAlign="center" mb={2}>
                            <IconButton
                              component="a"
                              href={incident.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                              }}
                            >
                              <img src={incident.image} alt="Incident" style={{ width: '100%', height: 'auto' }} />
                            </IconButton>
                          </Box>
                        )}
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                          <Chip
                            icon={<Language />}
                            label="Source"
                            color="secondary"
                            component="a"
                            href={incident.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            clickable
                            sx={{
                              backgroundColor: '#1976d2',
                              color: '#ffffff',
                              ':hover': { backgroundColor: '#1565c0' },
                            }}
                          />
                          <Chip
                            label={incident.category}
                            color="info"
                            variant="outlined"
                            sx={{ borderColor: '#ffcc00', color: '#ffcc00' }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
            : null}
        </Grid>
      </Box>
    </Container>
  );
};

export default IncidentList;
