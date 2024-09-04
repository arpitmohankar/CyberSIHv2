import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Sidebar from './Sidebar.js';
import Navbar from './Navbar.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import IndiaMap from './IndiaMap'; // Ensure this path is correct
import { INDIAN_STATES } from '../utils/constants.js'; // Adjust path as needed

// Chart.js imports
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Layout = ({ children }) => {
  // Pie Chart State
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/scrape');
        setIncidents(response.data.data);
      } catch (err) {
        console.error('An error occurred while fetching incidents');
      }
    };

    fetchIncidents();
  }, []);

  const getCategoryCounts = () => {
    const counts = {};
    incidents.forEach((incident) => {
      counts[incident.category] = (counts[incident.category] || 0) + 1;
    });
    return counts;
  };

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

  // India Map State
  const [incidentsByState, setIncidentsByState] = useState({});
  const [popupContent, setPopupContent] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/incidents-by-state');
        setIncidentsByState(response.data.data);
      } catch (error) {
        console.error('Error fetching incidents by state:', error);
      }
    };

    fetchData();
  }, []);

  const handleStateClick = (stateName) => {
    const stateCode = Object.keys(INDIAN_STATES).find(key => INDIAN_STATES[key] === stateName);
    if (stateCode && incidentsByState[stateCode]) {
      const stateIncidents = incidentsByState[stateCode];
      if (stateIncidents.length > 0) {
        setPopupContent(
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            padding: '20px',
            backgroundColor: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000
          }}>
            <h3>Incident Details for {stateName}</h3>
            {stateIncidents.map((incident, index) => (
              <div key={index}>
                <p><strong>Source:</strong> <a href={incident.source} target="_blank" rel="noopener noreferrer">{incident.source}</a></p>
                <p><strong>Description:</strong> {incident.text}</p>
                <p><strong>Category:</strong> {incident.category}</p>
                {incident.image !== 'No image available' && (
                  <img src={incident.image} alt="Incident" style={{ width: '100%', borderRadius: '8px' }} />
                )}
                <hr />
              </div>
            ))}
            <button onClick={() => setPopupVisible(false)} style={{ marginTop: '10px' }}>Close</button>
          </div>
        );
        setPopupVisible(true);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#1A1A1D' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#2C2C3E', borderRadius: 4, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
          {children}

          {/* New Containers */}
          <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <Box sx={{
              backgroundColor: '#12151C',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
              width: '300px',  // Adjusted container width
              height: '250px',  // Adjusted container height
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Typography variant="h6" sx={{ color: '#FF6584' }}>
                Container 1
              </Typography>
            </Box>
            <Box sx={{
              backgroundColor: '#12151C',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
              width: '300px',  // Adjusted container width
              height: '250px',  // Adjusted container height
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Typography variant="h6" sx={{ color: '#FF6584' }}>
                Container 2
              </Typography>
            </Box>
          </Box>

          {/* Replaced Pie Chart */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '1rem',
            backgroundColor: '#12151C',
            borderRadius: '12px',
            padding: '0',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
            width: '450px',  // Adjusted container width for Pie chart
            height: '360px',  // Adjusted container height for Pie chart
            position: 'relative', // Positioning for top-left alignment
          }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: '1rem', color: '#C8CDD4' }}>
              Incident Categories Overview
            </Typography>
            <Box sx={{ position: 'top-right', top: 0, left: 0, width: '350px', height: '300px' }}> {/* Top-left aligned Pie chart */}
              <Pie data={chartData} />
            </Box>
          </Box>

          {/* India Map */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '1rem',
            backgroundColor: '#12151C',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: '1rem', color: '#C8CDD4' }}>
              Cybersecurity Incidents in India
            </Typography>
            <IndiaMap onStateClick={handleStateClick} />
          </Box>

          {/* Popup for India Map */}
          {popupVisible && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999
            }}>
              {popupContent}
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
