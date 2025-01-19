import React, { useState } from 'react';
import Map from './Map';
import CarbonEmissions from './CarbonEmissions';
import UserInputs from './UserInputs';

export default function Responsive() {
  // State to store car details (year, make, model)
  const [carDetails, setCarDetails] = useState({
    year: '',
    make: '',
    model: ''
  });

  // State to store the calculated distance
  const [distance, setDistance] = useState(null);

  // Handle the car details change from UserInputs
  const handleCarDetailsChange = (details) => {
    setCarDetails(details);
  };

  // Handle the distance change from Map
  const handleDistanceChange = (newDistance) => {
    setDistance(newDistance);
  };

  return (
    <div className="flex justify-center space-x pl-1 pr-1 items-center">
      {/* Pass the car details handler to UserInputs */}
      <UserInputs onCarDetailsChange={handleCarDetailsChange} />
      
      {/* Pass the distance handler to Map */}
      <Map onDistanceChange={handleDistanceChange} />
      
      {/* Always render CarbonEmissions */}
      <CarbonEmissions distance={distance} carDetails={carDetails} />
    </div>
  );
}