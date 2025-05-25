'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (term: string) => {
    router.push(`/products?${createQueryString('search', term)}`);
  };

  return (
    <div className="relative w-full mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
        <input
          type="text"
          placeholder="Search for"
          className="w-full pl-8 pr-4 py-2 bg-transparent border-b border-gray-200 focus:outline-none focus:border-gray-400"
          defaultValue={searchParams.get('search') ?? ''}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
} 