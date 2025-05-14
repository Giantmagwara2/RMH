import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../Form';

describe('Form', () => {
  it('renders children correctly', () => {
    const { getByTestId } = render(
      <Form>
        <div data-testid="child">Form content</div>
      </Form>
    );
    expect(getByTestId('child')).toBeInTheDocument();
  });

  it('handles form submission', () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    const { getByRole } = render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );
    fireEvent.submit(getByRole('form'));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
