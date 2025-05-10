import { render, fireEvent } from '@testing-library/react';
import { FormStepper } from '../FormStepper';

describe('FormStepper', () => {
  const steps = [
    { title: 'Step 1', content: <div>Step 1 content</div> },
    { title: 'Step 2', content: <div>Step 2 content</div> },
    { title: 'Step 3', content: <div>Step 3 content</div> }
  ];

  it('renders first step by default', () => {
    const { getByText } = render(<FormStepper steps={steps} />);
    expect(getByText('Step 1 content')).toBeInTheDocument();
  });

  it('navigates between steps', () => {
    const { getByText, getByRole } = render(<FormStepper steps={steps} />);
    const nextButton = getByRole('button', { name: /next/i });
    
    fireEvent.click(nextButton);
    expect(getByText('Step 2 content')).toBeInTheDocument();
  });

  it('shows completion state', () => {
    const { getByText, getByRole } = render(<FormStepper steps={steps} />);
    const nextButton = getByRole('button', { name: /next/i });
    
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(getByText('Step 3 content')).toBeInTheDocument();
  });
});