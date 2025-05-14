// Textarea.stories.jsx
import React, { useState } from 'react';
import { Textarea } from './Textarea';

export default {
  title: 'UI/Textarea',
  component: Textarea,
};

const Template = (args) => {
  const [text, setText] = useState('');
  return (
    <Textarea
      {...args}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Message',
  placeholder: 'Type your message...',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Message',
  placeholder: 'Type your message...',
  error: 'This field is required.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Message',
  placeholder: 'Cannot type here...',
  disabled: true,
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  label: 'Message',
  placeholder: 'Type your message...',
  borderColor: 'border-brand-primary',
  backgroundColor: 'bg-brand-light',
};
