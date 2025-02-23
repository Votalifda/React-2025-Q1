import { useMemo } from 'react';
import CardList from './parts/CardList.tsx';
import Loader from './parts/Loader.tsx';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useSearch } from './useSearch.ts';
import SearchPanel from './parts/SearchPanel.tsx';
import { useGetItemsQuery } from './api/api.ts';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const { search, setSearchValue } = useSearch();
  const { data, isLoading } = useGetItemsQuery({ page, search });
  // const dispatch = useDispatch();
  // const selectedItems = useSelector(
  //   (state: RootState) => state.selectedItems.items
  // );

  const items = useMemo(() => {
    return data ? data.results : [];
  }, [data]);

  const handleOnSearch = () => {
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    navigate(`/?${searchParams.toString()}`);
  };

  const handleOnCardClick = (id: string) => {
    navigate(`/details/${id}?${searchParams.toString()}`);
  };
  console.log('items', items);
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
              total={data?.count ? +data.count : 0}
            />
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
