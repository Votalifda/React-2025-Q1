import { render, screen, fireEvent } from '@testing-library/react';
import ThrowError from './../parts/ThrowError';

describe('ThrowError', () => {
  it('should throw an error when the button is clicked', () => {
    const renderComponent = () => render(<ThrowError />);

    renderComponent();

    const button = screen.getByText('Throw Error');

    expect(() => fireEvent.click(button)).toThrow('Testing error boundary!');
  });
});
