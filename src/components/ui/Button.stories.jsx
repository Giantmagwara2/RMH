import React from 'react';
import Button from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => <Button {...args}>Click Me</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'md',
  children: 'Primary Button', // Added children prop
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  size: 'md',
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  size: 'md',
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  size: 'md',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  size: 'md',
  disabled: true,
};

export const Sizes = () => (
  <div className="flex gap-4">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const Loading = Template.bind({});
Loading.args = {
  variant: 'primary',
  size: 'md',
  loading: true,
  children: 'Loading Button', // Added children prop
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: 'primary',
  size: 'md',
  children: (<span>Button with Icon</span>), // Example with span
};
