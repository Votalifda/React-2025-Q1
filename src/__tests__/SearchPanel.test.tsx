import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SearchPanel from '../parts/SearchPanel';

describe('SearchPanel Component', () => {
  const mockSetSearchValue = vi.fn();
  const mockHandleOnSearch = vi.fn();

  const setup = () => {
    render(
        <BrowserRouter>
          <SearchPanel
              search="test"
              setSearchValue={mockSetSearchValue}
              handleOnSearch={mockHandleOnSearch}
          />
        </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    setup();
    expect(screen.getByTestId("search"));
  });

  // it('calls setSearchValue on input change', () => {
  //   setup();
  //   const input = screen.getByTestId("search");
  //   fireEvent.change(input, { target: { value: 'new value' } });
  //   expect(mockSetSearchValue).toHaveBeenCalledWith('new value');
  // });

  it('calls handleOnSearch on button click', () => {
    setup();
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    expect(mockHandleOnSearch).toHaveBeenCalled();
  });
});