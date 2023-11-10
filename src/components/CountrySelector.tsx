// src/components/CountrySelector.tsx
import React, { useState, useEffect } from 'react';

interface CountrySelectorProps {
  onSelectCountry: (countryCode: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelectCountry }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [countryCodes, setCountryCodes] = useState<string[]>([]);

  useEffect(() => {
    // Implement logic to get country codes based on the selected region
    // This could be an API call or a predefined mapping
    // For example, you might have a mapping like { "Africa": ["NG", "ZA", ...], "Asia": ["IN", "JP", ...], ... }
    // Then, set the country codes based on the selected region.
    // Replace this with your actual implementation.

    const regionToCountryCodes: { [key: string]: string[] } = {
      "Africa": ["NG", "ZA", "KE", "EG", "ag"],
      "Asia": ["IN", "JP", "CN", "KR"],
      // Add more regions and country codes as needed
    };

    setCountryCodes(regionToCountryCodes[selectedRegion || ""] || []);
  }, [selectedRegion]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectCountry(event.target.value);
  };

  return (
    <div>
      <div>
        <label>Select Region: </label>
        <select onChange={handleRegionChange} value={selectedRegion || ''}>
          <option value="">-- Select Region --</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          {/* Add more regions as needed */}
        </select>
      </div>

      {selectedRegion && (
        <div>
          <h3>Available Country Codes:</h3>
          <select onChange={handleCountryChange}>
            <option value="">-- Select Country --</option>
            {countryCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
