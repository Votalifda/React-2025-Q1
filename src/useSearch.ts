import { useState } from 'react';

export const useSearch = () => {
  const [search, setSearchValue] = useState(
    localStorage.getItem('search') || ''
  );

  const setSearch = (value: string) => {
    localStorage.setItem('search', value);
    setSearchValue(value);
  };

  return {
    search,
    setSearch,
  };
};
