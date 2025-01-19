import React, { useState } from 'react';
import Map from './Map';
import CarbonEmissions from './CarbonEmissions';
import UserInputs from './UserInputs';

export default function Responsive() {
  const [carDetails, setCarDetails] = useState({
    year: '',
    make: '',
    model: ''
  });

  const [distance, setDistance] = useState(null);

  const handleCarDetailsChange = (details) => {
    setCarDetails(details);
  };

  const handleDistanceChange = (newDistance) => {
    setDistance(newDistance);
  };

  return (
    <div className="flex justify-center space-x pl-1 pr-1 items-center">
      <UserInputs onCarDetailsChange={handleCarDetailsChange} />
      <Map onDistanceChange={handleDistanceChange} />
      <CarbonEmissions distance={distance} carDetails={carDetails} />
    </div>
  );
}