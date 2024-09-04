import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const INDIA_TOPO_JSON = require('../utils/in-states-topo.json');

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] // Coordinates for India
};

const geographyStyle = {
  default: { outline: 'none' },
  hover: { fill: '#ccc', transition: 'all 250ms', outline: 'none' },
  pressed: { outline: 'none' }
};

const IndiaMap = ({ onStateClick }) => {
  const handleStateClick = (geo) => {
    const stateName = geo.properties.name;
    onStateClick(stateName); // Pass the state name to the parent component
  };

  return (
    <div>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={600}
        height={220}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={geographyStyle}
                fill="#EEE" // Default color for states
                onClick={() => handleStateClick(geo)} // Handle state click
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default IndiaMap;
