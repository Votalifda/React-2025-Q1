import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Table from './parts/Table.tsx';
import { ITableItem } from './types.ts';
import ErrorBoundary from './ErrorBoundary.tsx';
import ThrowError from './parts/ThrowError.tsx';
import Loader from './parts/Loader.tsx';
import './App.css';

const App = () => {
  const [items, setItems] = useState<Array<ITableItem>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(localStorage.getItem('search') || '');

  const fetchEpisodes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://swapi.dev/api/people?search=${search.trim()}`
      );
      if (!response.ok) {
        throw new Error('Network response error');
      }
      const data = await response.json();
      const items: Array<ITableItem> = data?.results || [];

      setIsLoading(false);
      setItems(
        items.map((item) => ({
          name: item.name,
          gender: item.gender,
          birth_year: item.birth_year,
        }))
      );
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  }, [search]);

  // const fetchEpisodes = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(
  //       `https://swapi.dev/api/people?search=${search.trim()}`
  //     );
  //     if (!response.ok) {
  //       throw new Error('Network response error');
  //     }
  //     const data = await response.json();
  //     const items: Array<ITableItem> = data?.results || [];
  //
  //     setIsLoading(false);
  //     setItems(
  //       items.map((item) => ({
  //         name: item.name,
  //         gender: item.gender,
  //         birth_year: item.birth_year,
  //       }))
  //     );
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error('Error fetching data:', error);
  //   }
  // };

  useEffect(() => {
    fetchEpisodes().then();
  }, [fetchEpisodes]);

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOnSearch = () => {
    localStorage.setItem('search', search);
    fetchEpisodes().then();
  };

  return (
    <div className="wrapper">
      <div className="section small">
        <label>Search:</label>
        <input onChange={(e) => onSearchInputChange(e)} value={search} />
        <button className="btnSearch" onClick={handleOnSearch}>
          Search
        </button>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </div>
      <div className="section big">
        {isLoading ? <Loader /> : <Table items={items} />}
      </div>
    </div>
  );
};

export default App;
