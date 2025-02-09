import { useCallback, useEffect, useState } from 'react';
import CardList from './parts/CardList.tsx';
import { ITableItem } from './types.ts';
import Loader from './parts/Loader.tsx';
import { useSearch } from './useSearch.ts';
import SearchPanel from './parts/SearchPanel.tsx';
import './App.css';

const App = () => {
  const [items, setItems] = useState<Array<ITableItem>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search, setSearchValue } = useSearch();

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

  useEffect(() => {
    fetchEpisodes().then();
  }, [fetchEpisodes]);

  const handleOnSearch = () => {
    fetchEpisodes().then();
  };

  return (
    <div className="wrapper">
      <SearchPanel
        search={search}
        setSearchValue={setSearchValue}
        handleOnSearch={handleOnSearch}
      />
      <div className="section big">
        {isLoading ? <Loader /> : <CardList items={items} />}
      </div>
    </div>
  );
};

export default App;
