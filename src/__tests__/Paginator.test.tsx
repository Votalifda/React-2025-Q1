import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Paginator from '../parts/Paginator';

describe('<Paginator />', () => {
  const renderWithRouter = (ui: React.ReactNode, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
  };

  it('renders without crashing', () => {
    renderWithRouter(<Paginator total={50} />);
    const paginatorElement = screen.getByTestId('paginator');
    expect(paginatorElement).toBeInTheDocument();
  });

  it('renders the correct number of buttons based on total items and items per page', () => {
    renderWithRouter(<Paginator total={50} ipp={10} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('sets the active page button correctly', () => {
    renderWithRouter(<Paginator total={50} ipp={10} />, { route: '/?page=2' });
    const activeButton = screen.getByText('2');
    expect(activeButton).toHaveClass('active');
  });

  it('renders correct number of buttons when items per page is not provided', () => {
    renderWithRouter(<Paginator total={50} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('renders correct number of buttons when total items is less than items per page', () => {
    renderWithRouter(<Paginator total={5} ipp={10} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
  });

  it('renders correct number of buttons when total items is zero', () => {
    renderWithRouter(<Paginator total={0} ipp={10} />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('does not update the URL when the active button is clicked', () => {
    renderWithRouter(<Paginator total={50} ipp={10} />, { route: '/?page=2' });
    const activeButton = screen.getByText('2');
    fireEvent.click(activeButton);
    expect(window.location.search).toBe('?page=2');
  });

  it('renders correct number of buttons when items per page is greater than total items', () => {
    renderWithRouter(<Paginator total={50} ipp={100} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
  });

  it('renders correct number of buttons when total items is not divisible by items per page', () => {
    renderWithRouter(<Paginator total={55} ipp={10} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
  });

  it('renders correct number of buttons when page number is out of range', () => {
    renderWithRouter(<Paginator total={50} ipp={10} />, { route: '/?page=100' });
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });
});