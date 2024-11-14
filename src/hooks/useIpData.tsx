/* eslint-disable @typescript-eslint/no-explicit-any */
import { IpData, UseIpDataReturn } from '@/types';
import axios from 'axios';
import { useState } from 'react';

export const useIpData = (): UseIpDataReturn => {
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserIp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city`,
        {
          params: { apiKey: process.env.IPIFY_API_KEY! as string },
        }
      );
      setIpData(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.messages ||
          'Failed to fetch your IP data. Please try again.'
      );
      console.error('Error fetching user IP data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchIpOrDomain = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(query);
      const params = {
        apiKey: process.env.IPIFY_API_KEY,
        [isIpAddress ? 'ipAddress' : 'domain']: query,
      };

      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city`,
        {
          params,
        }
      );

      setIpData(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.messages ||
          'Failed to fetch IP data. Please try again.'
      );
      console.error('Error fetching IP data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ipData,
    isLoading,
    error,
    fetchUserIp,
    searchIpOrDomain,
  };
};