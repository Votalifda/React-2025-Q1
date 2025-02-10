import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
