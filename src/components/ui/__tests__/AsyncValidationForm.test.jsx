
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AsyncValidationForm } from '../AsyncValidationForm';

describe('AsyncValidationForm', () => {
  it('handles async validation correctly', async () => {
    const onSubmit = jest.fn();
    render(<AsyncValidationForm onSubmit={onSubmit} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    await waitFor(() => {
      expect(screen.queryByText(/validating/i)).not.toBeInTheDocument();
    });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'test@example.com' })
    );
  });
});
