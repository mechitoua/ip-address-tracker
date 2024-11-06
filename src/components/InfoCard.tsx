import { InfoCardProps } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

const InfoCard: React.FC<InfoCardProps> = ({
  ipAddress,
  location,
  timezone,
  isp,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='md:hidden absolute -top-96 right-4 z-20 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2'>
        <span className='text-sm font-medium'>
          {isOpen ? 'Hide info' : 'Show more info'}
        </span>
        {isOpen ? (
          <ChevronUp className='w-5 h-5' />
        ) : (
          <ChevronDown className='w-5 h-5' />
        )}
      </button>

      {/* Info Card Container */}
      <div
        className={`
          absolute md:relative md:top-4 left-4 right-4 md:left-auto md:right-auto -top-20 mx-auto sm:m-0 transition-opacity duration-200 ease-in-out z-10 md:z-auto
          ${
            isOpen
              ? 'opacity-100 visible'
              : 'opacity-0 invisible md:opacity-100 md:visible'
          }
        `}>
        <div className='bg-white md:opacity-100 opacity-85 rounded-2xl shadow-xl mb-6 p-2 md:p-8 md:w-full md:max-w-6xl w-[300px] mx-auto backdrop-blur-lg'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8'>
            <InfoItem title='IP ADDRESS' value={ipAddress} />
            <InfoItem title='LOCATION' value={location} />
            <InfoItem title='TIMEZONE' value={timezone} />
            <InfoItem title='ISP' value={isp} />
          </div>
        </div>
      </div>
    </>
  );
};

const InfoItem: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => (
  <div className='text-center md:text-left md:border-l md:pl-4 first:border-0 first:pl-0 py-2 md:py-0'>
    <h2 className='text-xs md:text-sm font-bold text-gray-500 tracking-wider mb-1 md:mb-2'>
      {title}
    </h2>
    <p className='text-lg md:text-2xl font-bold text-gray-800 break-words'>
      {value}
    </p>
  </div>
);

export default InfoCard;
