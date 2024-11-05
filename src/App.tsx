import InfoCard from '@components/InfoCard';
import Map from '@components/Map';
import SearchBar from '@components/SearchBar';
import { useIpData } from '@hooks/useIpData';
import { useEffect } from 'react';

function App() {
  const { ipData, isLoading, error, fetchUserIp, searchIpOrDomain } =
    useIpData();

  useEffect(() => {
    fetchUserIp();
  }, []);

  if (!ipData) {
    return (
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <div className='text-center'>
          {isLoading ? (
            <div className='animate-pulse'>Loading your location...</div>
          ) : error ? (
            <div className='text-red-500'>{error}</div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 font-sans'>
      <div className='relative h-72 w-full flex flex-col items-center pt-8 px-4 bg-desk-img bg-cover'>
        <h1 className='text-white text-3xl font-bold mb-8'>
          IP Address Tracker
        </h1>
        <SearchBar onSearch={searchIpOrDomain} isLoading={isLoading} />

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
