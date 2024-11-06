import { SearchBarProps } from '@/types';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const isValidQuery = (value: string) => {
    // IP address regex pattern
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    // Domain pattern (basic validation)
    const domainPattern =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

    return ipPattern.test(value) || domainPattern.test(value);
  };

  const isValid = !query.trim() || isValidQuery(query.trim());

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-xl px-4 md:px-0'>
      <div className='relative flex flex-col'>
        <div className='relative'>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search for any IP address or domain (e.g., 8.8.8.8 or google.com)'
            className={`w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg rounded-xl shadow-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${!isValid ? 'border-2 border-red-500' : 'border-transparent'}
              placeholder:text-sm md:placeholder:text-base`}
            disabled={isLoading}
          />
          <button
            type='submit'
            disabled={isLoading || !isValid || !query.trim()}
            className='absolute right-0 h-full px-6 md:px-8 bg-black hover:bg-gray-800 rounded-r-xl
              transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed'>
            {isLoading ? (
              <Loader2 className='w-5 h-5 md:w-6 md:h-6 text-white animate-spin' />
            ) : (
              <ChevronRight className='w-5 h-5 md:w-6 md:h-6 text-white' />
            )}
          </button>
        </div>
        {!isValid && (
          <p className='text-red-500 text-sm mt-2 ml-2'>
            Please enter a valid IP address or domain name
          </p>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
