import { ChangeEvent, FC, useEffect, useState } from 'react';
import './Autocomplete.css';

type Props = {
  items: Array<string>;
  value: string;
  onChange: (value: string) => void;
};

const Autocomplete: FC<Props> = ({ items, value, onChange }) => {
  const [query, setQuery] = useState<string>(value);
  const [filtered, setFiltered] = useState<string[]>([]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setFiltered(
      value
        ? items.filter((item) =>
            item.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    setFiltered([]);
    onChange(value);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="autocomplete-input"
        placeholder="Введите..."
      />
      {filtered.length > 0 && (
        <ul className="suggestions">
          {filtered.map((item) => (
            <li
              key={item}
              className="suggestionItem"
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
