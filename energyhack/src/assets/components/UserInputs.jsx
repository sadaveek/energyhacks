import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";

function UserInputs({ onCarDetailsChange }) {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  // Debounced function to pass car details to the parent
  const debouncedCarDetailsChange = useCallback(
    debounce((updatedDetails) => {
      onCarDetailsChange(updatedDetails);
    }, 300), // Adjust the debounce delay as needed (300ms is common)
    []
  );

  const handleInputChange = (field, value) => {
    let updatedDetails = { year, make, model };

    if (field === "year") {
      setYear(value);
      updatedDetails = { ...updatedDetails, year: value };
    } else if (field === "make") {
      setMake(value);
      updatedDetails = { ...updatedDetails, make: value };
    } else if (field === "model") {
      setModel(value);
      updatedDetails = { ...updatedDetails, model: value };
    }

    // Pass the updated details to the debounced function
    debouncedCarDetailsChange(updatedDetails);
  };

  return (
    <div className="w-[300px] h-[400px] font-instrument p-4 bg-white rounded-[10px] animate-fade-right animate-ease-in-out shadow-md">
      <h2 className="text-lg font-bold mb-4">Vehicle Information</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="year">
          Year
        </label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={(e) => handleInputChange("year", e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="make">
          Make
        </label>
        <input
          type="text"
          id="make"
          value={make}
          onChange={(e) => handleInputChange("make", e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="model">
          Model
        </label>
        <input
          type="text"
          id="model"
          value={model}
          onChange={(e) => handleInputChange("model", e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  );
}

export default UserInputs;