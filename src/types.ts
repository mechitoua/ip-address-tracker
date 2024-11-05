export interface MapProps {
  position: [number, number];
}

export interface IpData {
  ip: string;
  location: {
    city: string;
    region: string;
    postalCode: string;
    timezone: string;
    lat: number;
    lng: number;
  };
  isp: string;
}

export interface InfoCardProps {
  ipAddress: string;
  location: string;
  timezone: string;
  isp: string;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export interface UseIpDataReturn {
  ipData: IpData | null;
  isLoading: boolean;
  error: string | null;
  fetchUserIp: () => Promise<void>;
  searchIpOrDomain: (query: string) => Promise<void>;
}
