import { render, act } from '@testing-library/react';
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
    const { getByText } = render(
      <Toast message="Test message" type="success" />
    );
    expect(getByText('Test message')).toBeInTheDocument();
  });

  it('auto-dismisses after duration', () => {
    const onClose = jest.fn();
    render(
      <Toast message="Test message" duration={3000} onClose={onClose} />
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onClose).toHaveBeenCalled();
  });

  it('renders with correct type class', () => {
    const { container } = render(
      <Toast message="Info message" type="info" />
    );
    expect(container.firstChild).toHaveClass('bg-blue-600'); // Check for actual style class
  });

  it('does not auto-dismiss if duration is not provided', () => {
    const onClose = jest.fn();
    render(
      <Toast message="Persistent message" onClose={onClose} />
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(onClose).not.toHaveBeenCalled();
  });
});