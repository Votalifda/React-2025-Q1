import { FC } from 'react';
import { ITableItem } from '../types.ts';
import { useDispatch } from 'react-redux';
import { clearItems } from '../store/slices/selectedItemsSlice.ts';
import '../App.css';

interface Props {
  items: Array<ITableItem>;
}

const Flyout: FC<Props> = ({ items }) => {
  const dispatch = useDispatch();

  const handleUnselectAll = () => {
    dispatch(clearItems());
  };

  const handleDownload = () => {
    if (items.length === 0) return;

    const headers = ['ID', 'Name', 'Gender', 'Birth Year', 'URL'];
    const csvContent = [
      headers.join(','),
      ...items.map(
        (item) =>
          `"${item.id}","${item.name}","${item.gender}","${item.birth_year}","${item.url}"`
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${items.length}_people.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flyout-wrapper" data-testid="flyout">
      <div>Selected: {items.length}</div>
      <div>
        <button onClick={handleUnselectAll}>Unselect All</button>
      </div>
      <div>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default Flyout;
