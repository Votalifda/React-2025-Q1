import { useState } from 'react';

export const useSearch = () => {
  const [search, setSearch] = useState(localStorage.getItem('search') || '');

  const setSearchValue = (value: string) => {
    localStorage.setItem('search', value);
    setSearch(value);
  };

  return {
    search,
    setSearchValue,
  };
};
