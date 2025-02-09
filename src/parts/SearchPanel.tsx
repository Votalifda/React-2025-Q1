import { ChangeEvent, FC } from 'react';
import ErrorBoundary from '../ErrorBoundary.tsx';
import ThrowError from './ThrowError.tsx';
import '../App.css';

interface Props {
  search: string;
  handleOnSearch: () => void;
  setSearchValue: (value: string) => void;
}

const SearchPanel: FC<Props> = ({ search, setSearchValue, handleOnSearch }) => {
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
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
  );
};

export default SearchPanel;
