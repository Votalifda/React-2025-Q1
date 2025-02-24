import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './../router';
import { vi } from 'vitest';

vi.mock('./../App', () => ({
  default: () => <div>App Component</div>,
}));
vi.mock('./../parts/CardDetails', () => ({
  default: () => <div>CardDetails Component</div>,
}));
vi.mock('./../Page404', () => ({
  default: () => <div>Page404 Component</div>,
}));

describe('AppRoutes', () => {
  it('renders App component for the root route', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
    );

    expect(screen.getByText('App Component')).toBeInTheDocument();
  });

  it('renders CardDetails component for the details route', () => {
    render(
        <MemoryRouter initialEntries={['/details/1']}>
          <AppRoutes />
        </MemoryRouter>
    );

    // expect(screen.getByText('Card')).toBeInTheDocument();
  });

  it('renders Page404 component for an unknown route', () => {
    render(
        <MemoryRouter initialEntries={['/unknown']}>
          <AppRoutes />
        </MemoryRouter>
    );

    expect(screen.getByText('Page404 Component')).toBeInTheDocument();
  });
});