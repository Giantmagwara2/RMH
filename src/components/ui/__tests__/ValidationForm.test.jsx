
import { render, screen, fireEvent } from '@testing-library/react';
import { ValidationForm } from '../ValidationForm';

describe('ValidationForm', () => {
  it('validates required fields', () => {
    const onSubmit = jest.fn();
    render(<ValidationForm onSubmit={onSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
  
  it('submits when validation passes', () => {
    const onSubmit = jest.fn();
    render(<ValidationForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'John Doe' })
    );
  });
});
