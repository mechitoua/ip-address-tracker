import { InfoCardProps } from '@/types';

const InfoCard: React.FC<InfoCardProps> = ({
  ipAddress,
  location,
  timezone,
  isp,
}) => {
  return (
    <div className='bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-6xl mx-auto'>
      <InfoItem title='IP ADDRESS' value={ipAddress} />
      <InfoItem title='LOCATION' value={location} />
      <InfoItem title='TIMEZONE' value={timezone} />
      <InfoItem title='ISP' value={isp} />
    </div>
  );
};

const InfoItem: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => (
  <div className='text-center md:text-left md:border-l md:pl-8 first:border-0 first:pl-0'>
    <h2 className='text-sm font-bold text-slate-400 tracking-wider mb-2'>
      {title}
    </h2>
    <p className='text-2xl font-bold text-slate-950'>{value}</p>
  </div>
);

export default InfoCard;
