import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const Map = ({ onDistanceChange }) => {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  const [distance, setDistance] = useState(null);

  const containerStyle = {
    width: '100%',
    height: '500px',
  };

  const center = {
    lat: 33.7490,  // Default center (Atlanta, GA)
    lng: -84.3880,
  };

  const handleDirectionsResponse = useCallback((result) => {
    if (result && result.status === 'OK') {
      setDirections(result);
      // Extracting the distance from the route (in meters)
      const routeDistance = result.routes[0].legs[0].distance.value; // Distance in meters
      const distanceInMiles = routeDistance / 1609.34; // Convert meters to miles
      setDistance(distanceInMiles.toFixed(2)); // Store the distance in miles (rounded to 2 decimal places)

      // Call the parent callback to send the distance data
      if (onDistanceChange) {
        onDistanceChange(distanceInMiles.toFixed(2)); // Pass the distance to the parent
      }

      setIsCalculating(false);
    } else {
      console.error('Error fetching directions:', result);
      setIsCalculating(false);
    }
  }, [onDistanceChange]);

  const handleRouteCalculation = () => {
    if (origin && destination) {
      setIsCalculating(true);
      setDirections(null);
      setDistance(null); // Clear previous distance when calculating a new route
      setMapKey(prevKey => prevKey + 1); // Force re-render of the map
    }
  };

  return (
    <div className="w-full h-[650px] flex flex-col items-center space-y-4 p-4 animate-fade animate-duration-1000 font-instrument">
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Enter origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-72 p-2 rounded-md border border-gray-300"
        />
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-72 p-2 rounded-md border border-gray-300"
        />
        <button
          onClick={handleRouteCalculation}
          className="bg-palette4 text-white p-2 rounded-md"
        >
          Calculate Route
        </button>
      </div>

      <LoadScript googleMapsApiKey= "AIzaSyCndVsSm4eXPGetOCDRd1Cj7gPeYff-wj8" libraries={['places']}>
        <GoogleMap
          key={mapKey}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6}
        >
          {isCalculating && origin && destination && (
            <DirectionsService
              options={{
                origin,
                destination,
                travelMode: 'DRIVING',
              }}
              callback={handleDirectionsResponse}
            />
          )}

          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>

      {/* Distance display moved below the map */}
      {distance && (
        <div className="mt-4 text-lg text-instrument">
          <p>Distance: {distance} miles</p>
        </div>
      )}
    </div>
  );
};

export default Map;