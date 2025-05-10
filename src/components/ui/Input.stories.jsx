import React, { useState } from 'react';
import Input from './Input';

export default {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url']
    },
  },
};

const Template = (args) => {
  const [value, setValue] = useState('');
  return <Input {...args} value={value} onChange={e => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'example-input',
  label: 'Your Name',
  placeholder: 'Enter your name',
  helperText: 'This will be publicly visible.',
  error: false,
  disabled: false,
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  ...Default.args,
  error: true,
  helperText: 'Name is required.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};
