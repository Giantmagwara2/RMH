import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from '../Toast';

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders with message', () => {
    render(
      <Toast message="Test message" type="success" />
    );
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('auto-dismisses after duration', () => {
    const onClose = jest.fn();
    render(
      <Toast message="Test message" duration={3000} onClose={onClose} />
    );
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('renders with correct type class', () => {
    const { container: infoContainer } = render(
      <Toast message="Info message" type="info" />
    );
    expect(infoContainer.firstChild).toHaveClass('bg-blue-600');

    const { container: successContainer } = render(
      <Toast message="Success message" type="success" />
    );
    expect(successContainer.firstChild).toHaveClass('bg-green-600');

    const { container: warningContainer } = render(
      <Toast message="Warning message" type="warning" />
    );
    expect(warningContainer.firstChild).toHaveClass('bg-yellow-600');

    const { container: errorContainer } = render(
      <Toast message="Error message" type="error" />
    );
    expect(errorContainer.firstChild).toHaveClass('bg-red-600');
  });

  it('does not auto-dismiss if duration is Infinity', () => {
    const onClose = jest.fn();
    render(
      <Toast message="Persistent message" onClose={onClose} duration={Infinity} />
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onClose = jest.fn();
    render(<Toast message="Click to close" onClose={onClose} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders with a custom icon', () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />;
    render(<Toast message="With custom icon" icon={CustomIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Toast message="Custom class" className="my-custom-toast" />);
    expect(container.firstChild).toHaveClass('my-custom-toast');
  });
});