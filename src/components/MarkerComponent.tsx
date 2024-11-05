import { Icon, LatLng } from 'leaflet';
import { MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

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

export default MarkerComponent;
