import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from '../parts/Card';
import { ITableItem } from '../types';
import './setupTests';

const mockItem: ITableItem = {
  id: '1',
  url: '1',
  name: 'Luke Skywalker',
  gender: 'male',
  birth_year: '19BBY',
};

describe('Card component', () => {
  const handleOnCardClick = vi.fn();

  it('renders Card component with correct data', () => {
    render(<Card item={mockItem} handleOnCardClick={handleOnCardClick} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
  });

  it('calls handleOnCardClick with correct id when clicked', () => {
    render(<Card item={mockItem} handleOnCardClick={handleOnCardClick} />);

    const linkElement = screen.getByText('Luke Skywalker');
    fireEvent.click(linkElement);

    expect(handleOnCardClick).toHaveBeenCalledTimes(1);
    expect(handleOnCardClick).toHaveBeenCalledWith(mockItem.id);
  });
});
