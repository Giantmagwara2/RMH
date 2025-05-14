import React, { useState } from 'react';
import TextInput from './TextInput';

export default {
  title: 'Forms/TextInput',
  component: TextInput,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
  },
};

const Template = (args) => {
  const [value, setValue] = useState('');
  return <TextInput {...args} value={value} onChange={e => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'example',
  label: 'Your Name',
  placeholder: 'Enter your name',
};

export const WithError = Template.bind({});
WithError.args = {
  id: 'example-error',
  label: 'Your Name',
  placeholder: 'Enter your name',
  error: 'This field is required.',
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  id: 'example-custom',
  label: 'Your Name',
  placeholder: 'Enter your name',
  borderColor: 'border-brand-primary',
  backgroundColor: 'bg-brand-light',
};
