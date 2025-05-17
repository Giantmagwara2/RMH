import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Link from './Link';

export default {
  title: 'UI/Link',
  component: Link,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    to: { control: 'text', description: 'The path the link points to.' },
    children: { control: 'text', description: 'The content of the link.' },
    className: { control: 'text', description: 'Additional CSS classes for styling.' },
    isActive: { control: 'boolean', description: 'Whether the link is currently active.' },
  }
};

const Template = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  to: '/',
  children: 'Default Link',
};

export const ActiveLink = Template.bind({});
ActiveLink.args = {
  to: '/active-page',
  children: 'Active Link',
  isActive: true,
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  to: '/custom-styled',
  children: 'Custom Styled Link',
  className: 'text-semantic-success hover:text-green-700 text-lg',
};

export const MultipleLinks = () => (
  <div className="flex items-center space-x-4">
    <Link to="/">Home</Link>
    <Link to="/about">About Us</Link>
    <Link to="/services" isActive>Services (Active)</Link>
    <Link to="/contact" className="px-3 py-1 text-white rounded-md bg-brand-secondary hover:bg-brand-secondary/80">
      Contact Us (Button-like)
    </Link>
  </div>
);
MultipleLinks.parameters = {
  docs: {
    description: {
      story: 'Demonstrates multiple links with different states and styles, showcasing how they might appear in a navigation bar or similar context.',
    },
  },
};

// Story to demonstrate passing other props like aria-label
export const WithAriaLabel = Template.bind({});
WithAriaLabel.args = {
  to: '/accessible-link',
  children: 'Accessible Link',
  'aria-label': 'Navigate to the accessible link page',
};
