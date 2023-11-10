// src/components/Map.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, LatLngBoundsExpression } from 'leaflet';

interface MapProps {
  coordinates: string;
  countryName: string;
}

const Map: React.FC<MapProps> = ({ coordinates, countryName }) => {
  const [latitude, longitude] = parseCoordinates(coordinates);
  const position: LatLngExpression = [latitude, longitude];
  const bounds: LatLngBoundsExpression = [position, position]; // Set initial bounds to the selected country

  return (
    <MapContainer center={position} zoom={7} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
  // Assuming coordinates are in the format "28 00 N, 3 00 E"
  const [latDegrees, latMinutes, latDirection, lonDegrees, lonMinutes, lonDirection] = coordinates.split(' ');

  const latitude = parseFloat(latDegrees) + parseFloat(latMinutes) / 60 * (latDirection === 'S' ? -1 : 1);
  const longitude = parseFloat(lonDegrees) + parseFloat(lonMinutes) / 60 * (lonDirection === 'W' ? -1 : 1);

  return [latitude, longitude];
};

export default Map;
