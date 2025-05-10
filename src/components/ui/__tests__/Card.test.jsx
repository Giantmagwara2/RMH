
import { render } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('renders with title and content', () => {
    const { getByText } = render(
      <Card title="Test Card">
        <p>Card content</p>
      </Card>
    );
    expect(getByText('Test Card')).toBeInTheDocument();
    expect(getByText('Card content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">Content</Card>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
