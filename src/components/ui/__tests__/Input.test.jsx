import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<Input placeholder="Enter text" />);
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<Input onChange={handleChange} />);
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error state', () => {
    const { getByRole } = render(<Input error="Required field" />);
    const input = getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
