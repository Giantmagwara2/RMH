import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react'; // Use act from react
import { FormStepper } from '../FormStepper';

describe('FormStepper', () => {
  const mockOnComplete = jest.fn();

  const steps = [
    {
      title: 'Step 1',
      content: <div>Step 1 content</div>,
      validate: jest.fn(() => ({ isValid: true, values: {}, errors: {} })),
    },
    {
      title: 'Step 2',
      content: <div>Step 2 content</div>,
      validate: jest.fn(() => ({ isValid: true, values: {}, errors: {} })),
    },
    {
      title: 'Step 3',
      content: <div>Step 3 content</div>,
      validate: jest.fn(() => ({ isValid: true, values: {}, errors: {} })),
    },
  ];

  it('renders first step by default', () => {
    const { getByText } = render(<FormStepper steps={steps} onComplete={mockOnComplete} />);
    expect(getByText('Step 1 content')).toBeInTheDocument();
  });

  it('navigates between steps', async () => {
    const { getByText, getByRole } = render(<FormStepper steps={steps} onComplete={mockOnComplete} />);
    const nextButton = getByRole('button', { name: /next/i });

    await act(async () => {
      fireEvent.click(nextButton);
    });

    expect(getByText('Step 2 content')).toBeInTheDocument();
  });

  it('shows completion state', async () => {
    const { getByText, getByRole } = render(<FormStepper steps={steps} onComplete={mockOnComplete} />);
    const nextButton = getByRole('button', { name: /next/i });

    await act(async () => {
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
    });
    
    expect(getByText('Step 3 content')).toBeInTheDocument();
    expect(mockOnComplete).toHaveBeenCalled();
  });
});