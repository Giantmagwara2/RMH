import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<Button>Click me</Button>); 
    expect(getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles clicks', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>); 
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    const { getByRole } = render(<Button disabled>Click me</Button>); 
    expect(getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Click me</Button>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with different variants', () => {
    const { getByRole } = render(<Button variant="secondary">Click me</Button>);
    expect(getByRole('button')).toHaveClass('bg-gray-200'); // Example class for secondary variant
  });

  it('renders with different sizes', () => {
    const { getByRole } = render(<Button size="small">Click me</Button>);
    expect(getByRole('button')).toHaveClass('text-sm'); // Example class for small size
  });

  // Add more tests as needed for other props and states
});
