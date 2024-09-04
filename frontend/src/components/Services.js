import React from 'react';
import { Box, Typography, Grid, Button, Paper } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import 'chart.js/auto';
import './Services.css';

const ServicesPage = () => {
  const pieChartData = {
    labels: ['Phishing', 'Identity Theft', 'Malware', 'Ransomware', 'Hacking'],
    datasets: [
      {
        label: 'Cyber Crimes',
        data: [300, 50, 100, 200, 150],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57'],
      },
    ],
  };

  return (
    <Box sx={{ padding: 4, textAlign: 'center', backgroundColor: '#f4f4f4' }}>
      <Typography variant="h3" gutterBottom>
        Cyber Crime Services in India
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Real-Time Cyber Crime Data
            </Typography>
            <Typography variant="body1">
              Representing real-time data of cyber crimes happening in India, categorized by state.
            </Typography>
            {/* Placeholder for real-time data */}
            <Box sx={{ marginTop: 3, height: 300, backgroundColor: '#e0e0e0' }}>
              {/* Real-time data visualization component would go here */}
              <Typography variant="h6" sx={{ paddingTop: 10 }}>
                Real-time data loading...
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Daily Cyber Crime Overview
            </Typography>
            <Pie data={pieChartData} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Real-Time Map of Cyber Crime in India
            </Typography>
            <Typography variant="body1">
              Visualize the distribution of cyber crimes across Indian states in real-time.
            </Typography>
            <Box sx={{ marginTop: 3, height: 400, backgroundColor: '#e0e0e0' }}>
              {/* Real-time map visualization component would go here */}
              <Typography variant="h6" sx={{ paddingTop: 15 }}>
                Real-time map loading...
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              User Support
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={() => window.location.href = 'tel:155260'}
            >
              SOS Call to Cyber Crime Authority
            </Button>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Get immediate help by contacting the cybercrime authorities.
            </Typography>
            <Link to="/faqs">
              <Button variant="outlined" color="secondary" sx={{ marginTop: 2 }}>
                FAQs & Chatbot
              </Button>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Personalized Notifications
            </Typography>
            <Typography variant="body1">
              Stay informed with regular notifications about cyber crimes, your filed complaints, and more.
            </Typography>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Learn More
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServicesPage;
