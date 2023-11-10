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
    "africa": ["ag", "ao", "bc", "bn", "by", "cd", "cf", "cg", "cm", "cn", "ct", "cv", "dj", "eg", "ek", "er", "et", "ga", "gb", "gh", "gv", "iv", "ke", "li", "lt", "ly", "ma", "mi", "ml", "mo", "mp", "mr", "mz", "ng", "ni", "od", "pu", "rw", "se", "sf", "sg", "sh", "sl", "so", "su", "to", "tp", "ts", "tz", "ug", "uv", "wa", "wi", "wz", "za", "zi"],
    "antarctica": ["ay", "bv", "fs", "hm"],
    "australia-oceania": ["aq", "as", "at", "bp", "ck", "cq", "cr", "cw", "fj", "fm", "fp", "gq", "kr", "kt", "nc", "ne", "nf", "nh", "nr", "nz", "pc", "ps", "rm", "tl", "tn", "tv", "um", "wf", "wq", "ws"],
    "central-america-n-caribbean": ["aa", "ac", "av", "bb", "bf", "bh", "bq", "cj", "cs", "cu", "do", "dr", "es", "gj", "gt", "ha", "ho", "jm", "mh", "nn", "nu", "pm", "rn", "rq", "sc", "st", "tb", "td", "tk", "uc", "vc", "vi", "vq"],
    "central-asia": ["kg", "kz", "rs", "ti", "tx", "uz"],
    "east-n-southeast-asia": ["b,", "bx", "cb", "ch", "hk", "id", "ja", "kn", "ks", "la", "mc", "mg", "my", "pf", "pg", "pp", "rp", "sn", "th", "tt", "tw", "vm"],
    "europe": ["al", "an", "au", "ax", "be", "bk", "bo", "bu", "cy", "da", "dx", "ee", "ej", "en", "ez", "fi", "fo", "fr", "gi", "gk", "gm", "gr", "hr", "hu", "ic", "im", "it", "je", "jn", "kv", "lg", "lh", "lo", "ls", "lu", "md", "mj", "mk", "mn", "mt", "nl", "no", "pl", "po", "ri", "ro", "si", "sm", "sp", "sv", "sw", "sz", "uk", "up", "vt"],
    "middle-east": ["ae", "aj", "am", "ba", "gg", "gz", "ir", "is", "iz", "jo", "ku", "le", "mu", "qa", "sa", "sy", "tu", "we", "ym"],
    "north-america": ["bd", "ca", "gl", "ip", "mx", "sb", "us"],
    "oceans": ["oo", "xo", "xq", "zh", "zn"],
    "south-america": ["ar", "bl", "br", "ci", "co", "ec", "fk", "gy", "ns", "pa", "pe", "sx", "uy", "ve"],
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
