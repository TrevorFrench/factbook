// src/App.tsx
import React, { useState } from 'react';
import CountrySelector from './components/CountrySelector';
import CountryInfo from './components/CountryInfo';
import Map from './components/Map';

const App: React.FC = () => {
  // Assume there is a state for the selected country code
  const [selectedCountry, setSelectedCountry] = React.useState<string>('');

  // Handle the selection of a country
  const handleCountrySelect = (selectedCountryCode: string) => {
    setSelectedCountry(selectedCountryCode);
  };

  return (
    <div>
      <h1>World Factbook App</h1>
      <CountrySelector onSelectCountry={handleCountrySelect} />
      <CountryInfo countryCode={selectedCountry} />
       {/* && <Map coordinates={countryData.Introduction?.Background?.text} countryData={Pass country data here} /> */}
      {selectedCountry}
    </div>
  );
};

export default App;
