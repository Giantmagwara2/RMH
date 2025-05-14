import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tabs from '../Tabs';

describe('Tabs', () => {
  const mockTabs = (
    <Tabs>
      <Tabs.Tab>Tab 1</Tabs.Tab>
      <Tabs.Tab>Tab 2</Tabs.Tab>
      <div>Content 1</div>
      <div>Content 2</div>
    </Tabs>
  );

  it('renders all tab buttons', () => {
    const { getByText } = render(mockTabs);
    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(getByText('Tab 2')).toBeInTheDocument();
  });

  it('shows first tab content by default', () => {
    const { getByText } = render(mockTabs);
    expect(getByText('Content 1')).toBeInTheDocument();
  });

  it('switches content when clicking different tab', () => {
    const { getByText } = render(mockTabs);
    fireEvent.click(getByText('Tab 2'));
    expect(getByText('Content 2')).toBeInTheDocument();
  });

  it('applies active styles to selected tab', () => {
    const { getByText } = render(mockTabs);
    const firstTab = getByText('Tab 1');
    expect(firstTab).toHaveClass('text-brand-primary');
  });
});