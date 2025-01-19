import React, { useState, useEffect } from "react";

function CarbonEmissions({ distance, carDetails }) {
  const [carbonEmissions, setCarbonEmissions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (distance && carDetails.year && carDetails.make && carDetails.model) {
      fetchVehicleModelId(carDetails);
    }
  }, [distance, carDetails]);

  const fetchVehicleModelId = async (carDetails) => {
    try {
      setLoading(true);
      setError(null);
  
      // Step 1: Fetch vehicle makes
      const makesResponse = await fetch("https://www.carboninterface.com/api/v1/vehicle_makes", {
        method: "GET",
        headers: {
          Authorization: `Bearer JbqDzC7czGwKxVJ9WK62A`,  // Corrected here
          "Content-Type": "application/json",
        },
      });
  
      if (!makesResponse.ok) {
        throw new Error(`Failed to fetch vehicle makes. Status: ${makesResponse.status}`);
      }
  
      const makesData = await makesResponse.json();
      console.log("Vehicle Makes Data:", makesData); // Log the makes data for debugging
  
      // Find the make ID for the specified car make
      const make = makesData.find((m) => m.data.attributes.name.toLowerCase() === carDetails.make.toLowerCase());
  
      if (!make) {
        throw new Error(`Vehicle make "${carDetails.make}" not found.`);
      }
  
      // Step 2: Fetch vehicle models for the selected make
      const modelsResponse = await fetch(
        `https://www.carboninterface.com/api/v1/vehicle_makes/${make.data.id}/vehicle_models`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer JbqDzC7czGwKxVJ9WK62A`,  // Corrected here
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!modelsResponse.ok) {
        throw new Error(`Failed to fetch vehicle models. Status: ${modelsResponse.status}`);
      }
  
      const modelsData = await modelsResponse.json();
      console.log("Vehicle Models Data:", modelsData); // Log the models data for debugging
  
      const model = modelsData.find(
        (m) =>
          m.data.attributes.name.toLowerCase() === carDetails.model.toLowerCase() &&
          parseInt(m.data.attributes.year, 10) === parseInt(carDetails.year, 10)
      );
  
      if (!model) {
        throw new Error(
          `Vehicle model "${carDetails.model}" (${carDetails.year}) not found for make "${carDetails.make}".`
        );
      }
  
      // Step 3: Fetch carbon emissions using vehicle_model_id
      fetchCarbonEmissions(distance, model.data.id);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };  

  const fetchCarbonEmissions = async (distance, vehicleModelId) => {
    try {
      setLoading(true);

      const response = await fetch("https://www.carboninterface.com/api/v1/estimates", {
        method: "POST",
        headers: {
          Authorization: `Bearer JbqDzC7czGwKxVJ9WK62A`,  // Corrected here
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "vehicle",
          distance_unit: "mi",
          distance_value: distance,
          vehicle_model_id: vehicleModelId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch emissions. Status: ${response.status}`);
      }

      const data = await response.json();
      const carbonData = data.data.attributes.carbon_kg;
      setCarbonEmissions(carbonData);
    } catch (error) {
      setError("Failed to calculate emissions.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[173px] h-[300px] bg-[#a3b18a] rounded-[10px] mr-1 p-2 text-center text-palette5 font-bold font-instrument animate-fade-left animate-ease-in-out shadow-md">
      <p className="text-2xl pb-10">Carbon Emissions:</p>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : carbonEmissions ? (
        <p className="text-2xl">{carbonEmissions} kg CO₂</p>
      ) : (
        <p>Enter details to calculate emissions.</p>
      )}
    </div>
  );
}

export default CarbonEmissions;