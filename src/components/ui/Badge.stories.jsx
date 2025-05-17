import React from 'react';
import Badge from './Badge';

// Define the component's story metadata
export default {
  title: 'UI/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

// Define a template for consistent story rendering
const Template = (args) => <Badge {...args} />;

// Create individual stories using the template
export const Default = Template.bind({});
Default.args = { children: 'Default', variant: 'default' };

export const Primary = Template.bind({});
Primary.args = { children: 'Primary', variant: 'primary' };

export const Success = Template.bind({});
Success.args = { children: 'Success', variant: 'success' };

export const Warning = Template.bind({});
Warning.args = { children: 'Warning', variant: 'warning' };

export const Error = Template.bind({});
Error.args = { children: 'Error', variant: 'error' };

export const Info = Template.bind({});
Info.args = { children: 'Info', variant: 'info' };
