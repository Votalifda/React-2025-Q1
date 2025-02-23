import { ChangeEvent, FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary.tsx';
import ThrowError from './ThrowError.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import '../App.css';

interface Props {
  search: string;
  handleOnSearch: () => void;
  setSearchValue: (value: string) => void;
}

const SearchPanel: FC<Props> = ({ search, setSearchValue, handleOnSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClose = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <div className="section small" onClick={handleClose} data-testid="search">
      <label>Search:</label>
      <input onChange={(e) => onSearchInputChange(e)} value={search} />
      <button className="btnSearch" onClick={handleOnSearch}>
        Search
      </button>
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
      <div className="themePanel">
        Theme:
        <div>
          <input
            type="radio"
            value="light"
            checked={theme === 'light'}
            onChange={() => toggleTheme('light')}
          />
          <label>Light</label>
        </div>
        <div>
          <input
            type="radio"
            value="dark"
            checked={theme === 'dark'}
            onChange={() => toggleTheme('dark')}
          />
          <label>Dark</label>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
