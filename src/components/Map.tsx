import { MapProps } from '@/types';

import { Icon, LatLng } from 'leaflet';
import { MapPin } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// Marker animation component
const MarkerComponent = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);

  useEffect(() => {
    // Fly to new position with animation
    map.flyTo(position, 13, {
      duration: 2,
    });

    // Animate marker if it exists
    if (markerRef.current) {
      const marker = markerRef.current;
      const newLatLng = new LatLng(position[0], position[1]);
      marker.setLatLng(newLatLng);
    }
  }, [position, map]);

  const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <Marker position={position} icon={customIcon} ref={markerRef}>
      <Popup className='text-sm'>
        <div className='flex items-center gap-2 py-1'>
          <MapPin className='w-4 h-4' />
          <span>Location Found</span>
        </div>
      </Popup>
    </Marker>
  );
};

export const Map: React.FC<MapProps> = ({ position }) => {
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
