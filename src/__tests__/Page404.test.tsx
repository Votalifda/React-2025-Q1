import { render, screen } from '@testing-library/react';
import Page404 from '../Page404';

describe('Page404', () => {
  it('renders the 404 Not Found message', () => {
    render(<Page404 />);
    const notFoundText = screen.getByText('404 Not Found');
    expect(notFoundText).toBeInTheDocument();
  });
});
