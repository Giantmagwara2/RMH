// Textarea.stories.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from './Textarea';
import { action } from '@storybook/addon-actions';

export default {
  title: 'UI/Textarea',
  component: Textarea,
  argTypes: {
    id: { control: 'text', description: 'Unique ID for the textarea, used for label association.' },
    label: { control: 'text', description: 'Label text for the textarea.' },
    name: { control: 'text', description: 'Name attribute for the textarea.' },
    value: { control: 'text', description: 'Current value of the textarea (controlled by story state).' },
    onChange: { action: 'changed', description: 'Callback function when the value changes.' },
    placeholder: { control: 'text', description: 'Placeholder text.' },
    rows: { control: 'number', description: 'Number of visible text lines.' },
    disabled: { control: 'boolean', description: 'Whether the textarea is disabled.' },
    error: { control: 'text', description: 'Error message to display.' },
    required: { control: 'boolean', description: 'Whether the textarea is required.' },
    'aria-label': { control: 'text', description: 'ARIA label for accessibility when no visible label is present.' },
    'aria-describedby': { control: 'text', description: 'IDs of elements that describe the textarea.' },
    maxLength: { control: 'number', description: 'Maximum number of characters allowed.' },
    borderColor: { control: 'text', description: 'Custom border color class (e.g., "border-brand-primary").' },
    backgroundColor: { control: 'text', description: 'Custom background color class (e.g., "bg-brand-light").' },
    className: { control: 'text', description: 'Additional CSS classes for the wrapper div.' },
    // ref is not directly controllable via args, but we can demonstrate its usage.
  },
};

const Template = (args) => {
  // Use a key to force re-render when args.value changes externally (e.g., from Storybook controls)
  // This is a common pattern if you want to allow external control of a controlled component's initial state in Storybook.
  const [internalValue, setInternalValue] = useState(args.value || '');

  useEffect(() => {
    // If the args.value is updated from Storybook controls, update internal state
    // This is mainly for if you manually type into the 'value' control in Storybook,
    // though for a textarea, direct interaction is more common.
    if (args.value !== undefined && args.value !== internalValue) {
      setInternalValue(args.value);
    }
  }, [args.value]);

  const handleChange = (e) => {
    setInternalValue(e.target.value);
    // Call the action from args if it exists (which it will due to argTypes)
    args.onChange(e);
  };

  return (
    <Textarea
      {...args}
      value={internalValue}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Message',
  id: 'default-message',
  placeholder: 'Type your message...',
  value: '', // Start with an empty value
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  id: 'error-message',
  label: 'Message',
  placeholder: 'Type your message...',
  error: 'This field is required.',
  value: 'Some initial text that might be invalid',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  id: 'disabled-message',
  label: 'Message',
  placeholder: 'Cannot type here...',
  disabled: true,
  value: 'This is disabled content',
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  ...Default.args,
  id: 'custom-style-message',
  label: 'Message',
  placeholder: 'Type your message...',
  borderColor: 'border-brand-primary',
  backgroundColor: 'bg-brand-light',
  className: 'p-space-sm bg-neutrals-surface-accent rounded-lg',
};

export const WithMaxLength = Template.bind({});
WithMaxLength.args = {
  ...Default.args,
  id: 'maxlength-message',
  label: 'Short Bio (Max 50 chars)',
  placeholder: 'Enter a brief bio...',
  maxLength: 50,
  rows: 2,
};

export const RequiredField = Template.bind({});
RequiredField.args = {
  ...Default.args,
  id: 'required-message',
  label: 'Feedback (Required)',
  placeholder: 'Your feedback is important...',
  required: true,
};

export const AriaLabelOnly = Template.bind({});
AriaLabelOnly.args = {
  // No 'label' prop
  id: 'aria-label-message',
  'aria-label': 'Search Query',
  placeholder: 'Enter search term...',
  value: '',
};

export const WithRef = (args) => {
  const [internalValue, setInternalValue] = useState(args.value || '');
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setInternalValue(e.target.value);
    args.onChange(e);
  };

  const handleFocusClick = () => {
    textareaRef.current?.focus();
  };

  return (
    <div>
      <button onClick={handleFocusClick} className="border rounded mb-space-sm p-space-xs">Focus Textarea</button>
      <Textarea
        {...args}
        ref={textareaRef}
        value={internalValue}
        onChange={handleChange}
      />
    </div>
  );
};
WithRef.args = {
  id: 'ref-message',
  label: 'Focusable Message',
  placeholder: 'Click button to focus...',
  value: '',
};
