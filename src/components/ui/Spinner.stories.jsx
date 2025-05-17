import React from 'react';
import Spinner from './Spinner';

export default {
  title: 'UI/Spinner',
  component: Spinner,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: {
      control: 'text',
      description: "Tailwind CSS text color class (e.g., 'text-blue-500', 'text-red-600').",
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
    },
  },
};

const Template = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = { size: 'md', color: 'text-brand-primary' };

export const Small = Template.bind({});
Small.args = { size: 'sm', color: 'text-brand-primary' };

export const Large = Template.bind({});
Large.args = { size: 'lg', color: 'text-brand-primary' };

export const CustomColor = Template.bind({});
CustomColor.args = { size: 'md', color: 'text-red-500' };
