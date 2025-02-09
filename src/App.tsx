import { useCallback, useEffect, useState } from 'react';
import CardList from './parts/CardList.tsx';
import { ITableItem } from './types.ts';
import Loader from './parts/Loader.tsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSearch } from './useSearch.ts';
import SearchPanel from './parts/SearchPanel.tsx';
import './App.css';
import { useHelpers } from './useHelpers.ts';

const App = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Array<ITableItem>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search, setSearchValue } = useSearch();
  const { getIdFromUrl } = useHelpers();

  const fetchPeople = useCallback(async () => {
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
          id: getIdFromUrl(item.url),
          url: item.url,
          name: item.name,
          gender: item.gender,
          birth_year: item.birth_year,
        }))
      );
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  }, [search, getIdFromUrl]);

  useEffect(() => {
    fetchPeople().then();
  }, [fetchPeople]);

  const handleOnSearch = () => {
    fetchPeople().then();
  };

  const handleOnCardClick = (id: string) => {
    console.log('handleOnCardClick ID', id);
    navigate(`/details/${id}`);
  };

  return (
    <div className="wrapper">
      <SearchPanel
        search={search}
        setSearchValue={setSearchValue}
        handleOnSearch={handleOnSearch}
      />
      <div className="section big">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="cards-wrapper">
            <CardList items={items} handleOnCardClick={handleOnCardClick} />
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
