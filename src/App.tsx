import { useCallback, useEffect, useState } from 'react';
import CardList from './parts/CardList.tsx';
import { ITableItem } from './types.ts';
import Loader from './parts/Loader.tsx';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useSearch } from './useSearch.ts';
import SearchPanel from './parts/SearchPanel.tsx';
import { getIdFromUrl } from './helpers.ts';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const [items, setItems] = useState<Array<ITableItem>>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { search, setSearchValue } = useSearch();

  const fetchPeople = useCallback(
    async (search: string) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://swapi.dev/api/people?page=${page}&search=${search.trim()}`
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
        setTotal(data?.count);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      }
    },
    [page]
  );

  useEffect(() => {
    fetchPeople('').then();
  }, [fetchPeople]);

  const handleOnSearch = () => {
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    navigate(`/?${searchParams.toString()}`);
    fetchPeople(search).then();
  };

  const handleOnCardClick = (id: string) => {
    navigate(`/details/${id}?${searchParams.toString()}`);
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
          <div className="results">
            <CardList
              items={items}
              handleOnCardClick={handleOnCardClick}
              total={total}
            />
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
