import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CardList from '../parts/CardList';
import { describe, it, expect, vi } from 'vitest';
import { ITableItem } from '../types.ts';
import { Provider } from "react-redux";
import { store } from "../store/store.ts";

const mockItems: Array<ITableItem> = [
  {
    id: '1',
    url: '1',
    name: 'Luke Skywalker',
    gender: 'male',
    birth_year: '19BBY',
  },
  {
    id: '1',
    url: '1',
    name: 'Leia Organa',
    gender: 'female',
    birth_year: '19BBY',
  },
];

describe('CardList component', () => {
  const handleOnCardClick = vi.fn();

  it('should render CardList with correct items', () => {
    render(
        <Provider store={store}>
          <BrowserRouter>
            <CardList
                items={mockItems}
                handleOnCardClick={handleOnCardClick}
                total={2}
            />
          </BrowserRouter>
        </Provider>
    );

    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Leia Organa/i)).toBeInTheDocument();
  });

  it('should call navigate function when wrapper is clicked', () => {
    const { container } = render(
        <Provider store={store}>
          <BrowserRouter>
            <CardList
                items={mockItems}
                handleOnCardClick={handleOnCardClick}
                total={2}
            />
          </BrowserRouter>
        </Provider>
    );

    fireEvent.click(container.querySelector('.cards-wrapper')!);
  });

  it('should render the correct number of Card components', () => {
    render(
        <Provider store={store}>
          <BrowserRouter>
            <CardList
                items={mockItems}
                handleOnCardClick={handleOnCardClick}
                total={2}
            />
          </BrowserRouter>
        </Provider>
    );

    const cardElements = screen.getAllByText(/19BBY/i);
    expect(cardElements).toHaveLength(mockItems.length);
  });

  it('should handle card click correctly', () => {
    render(
        <Provider store={store}>
          <BrowserRouter>
            <CardList
                items={mockItems}
                handleOnCardClick={handleOnCardClick}
                total={2}
            />
          </BrowserRouter>
        </Provider>
    );

    const card = screen.getByText('Luke Skywalker');
    fireEvent.click(card);

    expect(handleOnCardClick).toHaveBeenCalledTimes(1);
  });

  it('should render Paginator component', () => {
    render(
        <Provider store={store}>
          <BrowserRouter>
            <CardList
                items={mockItems}
                handleOnCardClick={handleOnCardClick}
                total={2}
            />
          </BrowserRouter>
        </Provider>
    );

    const paginatorElement = screen.getByTestId('paginator');
    expect(paginatorElement).toBeInTheDocument();
  });
});
