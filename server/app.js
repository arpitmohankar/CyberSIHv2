const events = require('events');
events.defaultMaxListeners = 30;

const express = require('express');
const cors = require('cors');
const { collectData } = require('./services/dataCollectornew'); // Use the new data collector

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware to allow requests from your frontend
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to scrape data and return it
app.get('/scrape', async (req, res) => {
  try {
    const incidents = await collectData();
    res.status(200).json({
      status: 'success',
      data: incidents,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to scrape data',
      error: error.message,
    });
  }
});

// Endpoint to fetch state-categorized incidents
app.get('/incidents-by-state', async (req, res) => {
  try {
    const incidents = await collectData(); // Collect data including state categorization
    const categorizedIncidents = incidents.reduce((acc, incident) => {
      const state = incident.state; // Assuming state is included in the incident data
      if (!acc[state]) {
        acc[state] = [];
      }
      acc[state].push(incident);
      return acc;
    }, {});

    res.status(200).json({
      status: 'success',
      data: categorizedIncidents,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch incidents by state',
      error: error.message,
    });
  }
});

// Default route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
