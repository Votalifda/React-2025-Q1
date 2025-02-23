import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Flyout from './../parts/Flyout';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../store/slices/selectedItemsSlice';
import { ITableItem } from '../types';
import { vi } from 'vitest';

const mockCreateObjectURL = vi.fn();
const mockRevokeObjectURL = vi.fn();

beforeAll(() => {
  global.URL.createObjectURL = mockCreateObjectURL;
  global.URL.revokeObjectURL = mockRevokeObjectURL;
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('Flyout', () => {
  const mockItems: Array<ITableItem> = [
    {
      id: '1',
      name: 'Luke Skywalker',
      gender: 'male',
      birth_year: '19BBY',
      url: 'https://swapi.dev/api/people/1/',
    },
    {
      id: '2',
      name: 'Leia Organa',
      gender: 'female',
      birth_year: '19BBY',
      url: 'https://swapi.dev/api/people/2/',
    },
  ];

  const setup = (items: Array<ITableItem> = []) => {
    const store = configureStore({
      reducer: {
        selectedItems: selectedItemsReducer,
      },
      preloadedState: {
        selectedItems: {
          items,
        },
      },
    });

    return render(
        <Provider store={store}>
          <Flyout items={items} />
        </Provider>
    );
  };

  it('renders the number of selected items', () => {
    setup(mockItems);
    expect(screen.getByText(`Selected: ${mockItems.length}`)).toBeInTheDocument();
  });

  it('renders "Unselect All" button', async () => {
    setup(mockItems);
    expect(screen.getByText(`Unselect All`)).toBeInTheDocument();
  });

  it('creates and downloads a CSV file when "Download" button is clicked', async () => {
    const originalCreateElement = document.createElement.bind(document);
    const mockCreateElement = vi.spyOn(document, 'createElement');
    const mockClick = vi.fn();
    const mockAppendChild = vi.fn();
    const mockRemoveChild = vi.fn();

    mockCreateElement.mockImplementation((tagName) => {
      if (tagName === 'a') {
        return {
          click: mockClick,
          href: '',
          download: '',
          appendChild: mockAppendChild,
          removeChild: mockRemoveChild,
        };
      }
      return originalCreateElement(tagName);
    });

    setup(mockItems);

    await userEvent.click(screen.getByText('Download'));

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockCreateElement).toHaveBeenCalledWith('a');
    expect(mockClick).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
    mockCreateElement.mockRestore();
  });

});
