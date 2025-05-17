import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AsyncValidationForm from '../AsyncValidationForm'; // Changed to default import

// Mock the async validation function if it's external or for controlled testing.
// For this example, we'll assume the validation logic is part of AsyncValidationForm
// or that we are testing its integrated behavior.
// If your actual AsyncValidationForm imports a validation function, you'd mock it:
// jest.mock('../path/to/yourValidationModule', () => ({
//   validateEmailAsync: jest.fn(),
// }));
// import { validateEmailAsync } from '../path/to/yourValidationModule';

describe('AsyncValidationForm', () => {
  const setup = (props) => {
    const user = userEvent.setup();
    const utils = render(<AsyncValidationForm {...props} />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    return { ...utils, user, emailInput, submitButton };
  };

  it('shows validating message, then allows submission with valid email', async () => {
    const onSubmit = jest.fn();
    // If mocking: validateEmailAsync.mockResolvedValue({ isValid: true, error: null });
    const { user, emailInput, submitButton } = setup({ onSubmit });

    // Initially, submit button might be disabled if email is required and empty
    expect(submitButton).toBeDisabled();

    await user.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');

    // Check for validating message
    // Use findByText for elements that appear asynchronously
    expect(await screen.findByText(/validating/i)).toBeInTheDocument();

    // Wait for validating message to disappear
    await waitFor(() => {
      expect(screen.queryByText(/validating/i)).not.toBeInTheDocument();
    });

    // After validation, if successful, no error message should be present
    expect(screen.queryByRole('alert')).not.toBeInTheDocument(); // Assuming errors are in an alert role
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'test@example.com' })
    );
    // Optionally, check for a success message if your form displays one
    // expect(await screen.findByText(/submitted successfully/i)).toBeInTheDocument();
  });

  it('shows error message for invalid email format and prevents submission', async () => {
    const onSubmit = jest.fn();
    // If mocking: validateEmailAsync.mockResolvedValue({ isValid: false, error: 'Invalid email format.' });
    const { user, emailInput, submitButton } = setup({ onSubmit });

    await user.type(emailInput, 'test-invalid-email');
    expect(await screen.findByText(/validating/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/validating/i)).not.toBeInTheDocument();
    });

    // Check for error message (assuming Alert component is used and has role="alert")
    const errorAlert = await screen.findByRole('alert');
    expect(errorAlert).toHaveTextContent(/invalid email format/i);
    expect(submitButton).toBeDisabled();

    await user.click(submitButton);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows error message if email is already taken and prevents submission', async () => {
    const onSubmit = jest.fn();
    // If mocking: validateEmailAsync.mockResolvedValue({ isValid: false, error: 'Email already taken.' });
    const { user, emailInput, submitButton } = setup({ onSubmit });

    // Use an email that your component's internal logic (or mock) would consider "taken"
    await user.type(emailInput, 'taken@example.com');
    expect(await screen.findByText(/validating/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/validating/i)).not.toBeInTheDocument();
    });

    const errorAlert = await screen.findByRole('alert');
    expect(errorAlert).toHaveTextContent(/email already taken/i);
    expect(submitButton).toBeDisabled();

    await user.click(submitButton);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('disables submit button while validating', async () => {
    const { user, emailInput, submitButton } = setup({ onSubmit: jest.fn() });

    await user.type(emailInput, 'a'); // Start typing to trigger validation
    // The button should be disabled as soon as validation starts
    // This might depend on the exact implementation of when isValidating is set.
    // If isValidating is set immediately on change, this will pass.
    // If it's set after a debounce, this might need adjustment or a brief waitFor.
    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/validating/i)).toBeInTheDocument();

    // Wait for validation to complete
    await waitFor(() => {
      expect(screen.queryByText(/validating/i)).not.toBeInTheDocument();
    });
    // After validation (assuming 'a' is invalid format), it should still be disabled due to error
    expect(submitButton).toBeDisabled();
  });
});
