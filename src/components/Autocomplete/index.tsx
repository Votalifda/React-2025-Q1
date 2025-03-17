import { ChangeEvent, FC, RefObject, useEffect, useState } from 'react';
import './Autocomplete.css';

type Props = {
  items: Array<string>;
  name: string;
  refValue?: RefObject<HTMLInputElement>;
  value?: string;
  onChange?: (value: string) => void;
};

const Autocomplete: FC<Props> = ({
  items,
  name,
  refValue,
  value,
  onChange,
}) => {
  const [query, setQuery] = useState<string>(value ?? '');
  const [filtered, setFiltered] = useState<string[]>([]);

  useEffect(() => {
    if (value) {
      setQuery(value);
    }
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
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="autocomplete">
      <input
        ref={refValue ? refValue : null}
        name={name}
        type="text"
        value={query}
        onChange={handleChange}
        className="autocomplete-input"
        placeholder="Find Country"
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
