import { MapProps } from '@/types';

import MarkerComponent from '@components/MarkerComponent';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const Map: React.FC<MapProps> = ({ position }) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={true}
      doubleClickZoom={true}
      style={{ height: '100%', width: '100%' }}
      className='z-0'
      attributionControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <MarkerComponent position={position} />
    </MapContainer>
  );
};

export default Map;
