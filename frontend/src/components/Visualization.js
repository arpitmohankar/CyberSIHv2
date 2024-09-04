import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IndiaMap from './IndiaMap';

const INDIAN_STATES = {
  "AP": "Andhra Pradesh",
  "AR": "Arunachal Pradesh",
  "AS": "Assam",
  "BR": "Bihar",
  "CT": "Chhattisgarh",
  "DL": "Delhi",
  "GA": "Goa",
  "GJ": "Gujarat",
  "HR": "Haryana",
  "HP": "Himachal Pradesh",
  "JK": "Jammu and Kashmir",
  "JH": "Jharkhand",
  "KA": "Karnataka",
  "KL": "Kerala",
  "MP": "Madhya Pradesh",
  "MH": "Maharashtra",
  "MN": "Manipur",
  "ML": "Meghalaya",
  "MZ": "Mizoram",
  "NL": "Nagaland",
  "OR": "Odisha",
  "PB": "Punjab",
  "RJ": "Rajasthan",
  "SK": "Sikkim",
  "TN": "Tamil Nadu",
  "TR": "Tripura",
  "UT": "Uttarakhand",
  "UP": "Uttar Pradesh",
  "WB": "West Bengal"
};

const Visualization = () => {
  const [incidentsByState, setIncidentsByState] = useState({});
  const [popupContent, setPopupContent] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/incidents-by-state'); // Fetch data by state
        setIncidentsByState(response.data.data); // Set categorized incidents by state
      } catch (error) {
        console.error('Error fetching incidents by state:', error);
      }
    };

    fetchData();
  }, []);

  const handleStateClick = (stateName) => {
    const stateCode = Object.keys(INDIAN_STATES).find(key => INDIAN_STATES[key] === stateName); // Get state code from state name
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
    <div>
      <h1>Cybersecurity Incidents in India</h1>
      <IndiaMap onStateClick={handleStateClick} />
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
    </div>
  );
};

export default Visualization;
