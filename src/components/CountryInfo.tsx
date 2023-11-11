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
  const [categoryVisibility, setCategoryVisibility] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://raw.githubusercontent.com/factbook/factbook.json/master/${region}/${countryCode}.json`);
        setCountryData(response.data);
  
        // Initialize categoryVisibility state with default visibility (e.g., false for all categories)
        const initialVisibility: { [key: string]: boolean } = {};
        Object.keys(response.data).forEach(category => {
          initialVisibility[category] = false;
        });
        setCategoryVisibility(initialVisibility);
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
              <h3>
                {key}
              </h3>
              {data[key] && data[key].text && (
                <div dangerouslySetInnerHTML={{ __html: data[key].text }} />
              )}
            </div>
          ))}
        </div>
      );
    }
    return <p>{data || 'No information available'}</p>;
  };

  const toggleCategoryVisibility = (category: string) => {
    setCategoryVisibility((prevVisibility) => ({
      ...prevVisibility,
      [category]: !prevVisibility[category],
    }));
  };

  return (
    
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="info" style={{ overflowY: 'auto', flex: 1, padding: '10px' }}>
        {!countryData && <p>Select a region/country code to see information.</p>}
        {countryData && (
          Object.keys(countryData).map((category) => (
            <div key={category}>
              <h2 onClick={() => toggleCategoryVisibility(category)} style={{ cursor: 'pointer' }}
              className={categoryVisibility[category] ? 'active' : ''} id='header'>{category}</h2>
              {categoryVisibility[category] && renderContent(countryData[category])}
            </div>
          ))
        )}
      </div>

      {countryData && (
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <Map coordinates={countryData?.Geography?.["Geographic coordinates"]?.text} 
                countryLocation={countryData?.Geography?.Location?.text} />
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
