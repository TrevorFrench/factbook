// src/components/CountrySelector.tsx
import React, { useState, useEffect } from 'react';

interface CountrySelectorProps {
  onSelectCountry: (countryCode: string) => void;
  onSelectRegion: (region: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelectCountry, onSelectRegion }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [countryCodes, setCountryCodes] = useState<string[]>([]);

  const regionToCountryCodes: { [key: string]: string[] } = {
    "africa": ["NG", "ZA", "KE", "EG", "ag"],
    "antarctica": ["IN", "JP", "CN", "KR"],
    "australia-oceania": ["IN", "JP", "CN", "KR"],
    "central-america-n-caribbean": ["IN", "JP", "CN", "KR"],
    "central-asia": ["IN", "JP", "CN", "KR"],
    "east-n-southeast-asia": ["IN", "JP", "CN", "KR"],
    "europe": ["IN", "JP", "CN", "KR"],
    "middle-east": ["IN", "JP", "CN", "KR"],
    "north-america": ["IN", "JP", "CN", "KR"],
    "oceans": ["IN", "JP", "CN", "KR"],
    "south-america": ["IN", "JP", "CN", "KR"],
    "south-asia": ["af", "bg", "bt", "ce", "in", "io", "mv", "np", "pk"],
    // Add more regions and country codes as needed
  };

  useEffect(() => {
    // Implement logic to get country codes based on the selected region
    // This could be an API call or a predefined mapping
    // For example, you might have a mapping like { "Africa": ["NG", "ZA", ...], "Asia": ["IN", "JP", ...], ... }
    // Then, set the country codes based on the selected region.
    // Replace this with your actual implementation.

    setCountryCodes(regionToCountryCodes[selectedRegion || ""] || []);
  }, [selectedRegion]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = event.target.value;
    onSelectRegion(selectedRegion);
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
          {Object.keys(regionToCountryCodes).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
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
