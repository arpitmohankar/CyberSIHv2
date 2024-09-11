import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Sidebar from "./Sidebar.js";
import Navbar from "./Navbar.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import IndiaMap from "./IndiaMap";
import { INDIAN_STATES } from "../utils/constants.js";
import PersonIcon from "@mui/icons-material/Person";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Layout = ({ children }) => {
  const [incidents, setIncidents] = useState([]);
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get("https://cybersihv2.onrender.com/scrape");
        setIncidents(response.data.data);
      } catch (err) {
        console.error("An error occurred while fetching incidents");
      }
    };

    fetchIncidents();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("https://cybersihv2.onrender.com/user-count");
        setUserCount(response.data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
    const interval = setInterval(fetchUserCount, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryCounts = () => {
    const counts = {};
    incidents.forEach((incident) => {
      counts[incident.category] = (counts[incident.category] || 0) + 1;
    });
    return counts;
  };

  const lightColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  const chartData = {
    labels: Object.keys(getCategoryCounts()),
    datasets: [
      {
        label: "Incident Categories",
        data: Object.values(getCategoryCounts()),
        backgroundColor: lightColors,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar on the left */}
      <Box
        sx={{
          width: "20%",
          height: "100%",
          position: "fixed",
        }}
      >
        <Sidebar />
      </Box>

      {/* Dashboard Area */}
      <Box
        sx={{
          marginLeft: "20%",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1A1A1D",
          padding: "2rem", // Adjust padding for consistency
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: "1.5rem",
            backgroundColor: "#2C2C3E",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {children}

          {/* User Count */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {userCount === null ? (
              <CircularProgress sx={{ color: "#FF6584" }} />
            ) : (
              <>
                <PersonIcon
                  sx={{
                    fontSize: "50px",
                    color: "#FF6584",
                    marginBottom: "10px",
                  }}
                />
                <Typography variant="h6" sx={{ color: "#FF6584" }}>
                  {userCount} Users Visited
                </Typography>
              </>
            )}
          </Box>

          {/* Incident Categories Pie Chart */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#C8CDD4", marginBottom: "1rem" }}>
              Incident Categories Overview
            </Typography>
            <Box sx={{ width: "300px", height: "250px" }}>
              <Pie data={chartData} style={{ width: "100%", height: "100%" }} />
            </Box>
          </Box>

          {/* India Map */}
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: "center", color: "#C8CDD4" }}
            >
              Cybersecurity Incidents in India
            </Typography>
            <IndiaMap />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
