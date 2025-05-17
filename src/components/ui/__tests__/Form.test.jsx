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

  it('handles form submission with values', async () => {
    const handleSubmit = jest.fn(async (values) => {
      // Simulate a successful submission
      return { success: true, data: values };
    });

    const { getByRole, getByLabelText } = render(
      <Form onSubmit={handleSubmit} initialValues={{ name: '', email: '' }}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" defaultValue="John Doe" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" defaultValue="john.doe@example.com" />
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.submit(getByRole('form')); // Use getByRole('form') to target the form

    expect(handleSubmit).toHaveBeenCalled(); // Check if handleSubmit was called
  });
});
