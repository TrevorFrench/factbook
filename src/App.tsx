// src/App.tsx
import React, { useState } from 'react';
import CountrySelector from './components/CountrySelector';
import CountryInfo from './components/CountryInfo';

const App: React.FC = () => {
  // Assume there is a state for the selected country code
  const [selectedCountry, setSelectedCountry] = React.useState<string>('');

  // Handle the selection of a country
  const handleCountrySelect = (selectedCountryCode: string) => {
    setSelectedCountry(selectedCountryCode);
  };

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <div>
      {/* <h1>World Factbook App</h1> */}
      <CountrySelector onSelectCountry={handleCountrySelect} onSelectRegion={handleRegionSelect} />
      <CountryInfo countryCode={selectedCountry} region={selectedRegion} />
       {/* && <Map coordinates={countryData.Introduction?.Background?.text} countryData={Pass country data here} /> */}
      {selectedCountry}
    </div>
  );
};

export default App;
