import React, { useEffect, useRef } from 'react';

function Destination({ setDestination }) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (window.google && inputRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode'],
      });

      autocompleteRef.current.addListener('place_changed', handlePlaceChanged);
    }

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      setDestination(place.geometry.location);
    } else {
      setDestination(null);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter destination (e.g., Miami, FL)"
        className="w-[398px] h-[59px] font-instrument rounded-full bg-palette1 border-none p-2.5 pl-6 focus:outline-none"
      />
    </div>
  );
}

export default Destination;