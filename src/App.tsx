import { IpData } from '@/types';
import { InfoCard } from '@components/InfoCard';
import { Map } from '@components/Map';
import { SearchBar } from '@components/SearchBar';
import axios from 'axios';
import { useState } from 'react';

const initialData = {
  ip: '192.212.174.101',
  location: {
    city: 'Brooklyn',
    region: 'NY',
    postalCode: '10001',
    timezone: 'UTC -05:00',
    lat: 40.7128,
    lng: -74.006,
  },
  isp: 'SpaceX Starlink',
};

function App() {
  const [ipData, setIpData] = useState<IpData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (ipAddress: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const ip = /^(\d{1,3}\.){3}\d{1,3}$/.test(ipAddress);
      const apiKey = process.env.IPIFY_API_KEY! as string;
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`,
        {
          params: {
            ...(ip ? { ip: ipAddress } : { domain: ipAddress }),
          },
        }
      );
      setIpData(response.data);
    } catch (err) {
      setError('Failed to fetch IP data. Please try again.');
      console.error('Error fetching IP data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 font-sans'>
      <div className='relative h-72 w-full flex flex-col items-center pt-8 px-4 bg-desk-img bg-cover'>
        <h1 className='text-white text-3xl font-bold mb-8'>
          IP Address Tracker
        </h1>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className='mt-4 text-red-200 bg-red-500/20 px-4 py-2 rounded-lg'>
            {error}
          </div>
        )}

        <div className='absolute md:-bottom-24 -bottom-72 left-4 right-4 z-10'>
          <InfoCard
            ipAddress={ipData.ip}
            location={`${ipData.location.city}, ${ipData.location.region} ${ipData.location.postalCode}`}
            timezone={ipData.location.timezone}
            isp={ipData.isp}
          />
        </div>
      </div>

      <div className='h-[calc(100vh-18rem)]'>
        <Map position={[ipData.location.lat, ipData.location.lng]} />
      </div>
    </div>
  );
}

export default App;
