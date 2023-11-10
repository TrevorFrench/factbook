// src/components/Map.tsx
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, LatLngBoundsExpression, Map as LeafletMap } from 'leaflet';
interface MapProps {
  coordinates: string;
  countryName: string;
}

const Map: React.FC<MapProps> = ({ coordinates, countryName }) => {
  const [latitude, longitude] = parseCoordinates(coordinates);
  const position: LatLngExpression = [latitude, longitude];
  const bounds: LatLngBoundsExpression = [position, position];
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    // Center the map on the marker when the coordinates change
    if (mapRef.current) {
      mapRef.current.setView(position);
    }
  }, [coordinates]);

  return (
    <MapContainer ref={mapRef} center={position} zoom={7} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>{countryName}</Popup>
      </Marker>
    </MapContainer>
  );
};

// Helper function to parse coordinates
const parseCoordinates = (coordinates: string): [number, number] => {
    const cleanedCoordinates = coordinates.replace(/,/g, '');
    const [latDegrees, latMinutes, latDirection, lonDegrees, lonMinutes, lonDirection] = cleanedCoordinates.split(' ');
    
    const lat = parseFloat(latDegrees) + parseFloat(latMinutes) / 60 
    const lon = parseFloat(lonDegrees) + parseFloat(lonMinutes) / 60
    const latitude = latDirection === 'N' ? lat : -lat;
    const longitude = lonDirection === 'E' ? lon : -lon;

    return [latitude, longitude];
  };

export default Map;
