import { SearchBarProps } from '@/types';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-xl'>
      <div className='relative flex'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search for any IP address or domain'
          className='w-full px-6 py-4 text-lg rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
          disabled={isLoading}
        />
        <button
          type='submit'
          disabled={isLoading}
          className='absolute right-0 h-full px-8 bg-black hover:bg-gray-800 rounded-r-xl transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed cursor-pointer'>
          {isLoading ? (
            <Loader2 className='w-6 h-6 text-white animate-spin' />
          ) : (
            <ChevronRight className='w-8 h-8 text-white' />
          )}
        </button>
      </div>
    </form>
  );
};
