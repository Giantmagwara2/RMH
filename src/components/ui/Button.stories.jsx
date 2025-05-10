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
