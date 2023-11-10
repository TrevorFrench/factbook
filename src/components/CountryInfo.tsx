// src/components/CountryInfo.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Map from './Map';

interface CountryInfoProps {
  countryCode: string;
  region: string | null;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ countryCode, region }) => {
  const [countryData, setCountryData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://raw.githubusercontent.com/factbook/factbook.json/master/${region}/${countryCode}.json`);
        setCountryData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCountryData(null);
      }
    };

    if (countryCode) {
      fetchData();
    }
  }, [countryCode]);

  const renderContent = (data: any) => {
    if (typeof data === 'object') {
      return (
        <div>
          {Object.keys(data).map((key) => (
            <div key={key}>
              {key !== 'text' && <h3>{key}</h3>}
              {data[key] && data[key].text && (
                <div dangerouslySetInnerHTML={{ __html: data[key].text }} />
              )}
              {/* {renderContent(data[key])} */}
            </div>
          ))}
        </div>
      );
    }
    return <p>{data || 'No information available'}</p>;
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ overflowY: 'auto', flex: 1, paddingRight: '10px' }}>
        {countryData && (
          Object.keys(countryData).map((category) => (
            <div key={category}>
              <h2>{category}</h2>
              {renderContent(countryData[category])}
            </div>
          ))
        )}
        {!countryData && <p>Select a country to see information.</p>}
      </div>

      {countryData && (
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <Map coordinates={countryData?.Geography?.["Geographic coordinates"]?.text} countryName={countryData?.Introduction?.Background?.text} />
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
