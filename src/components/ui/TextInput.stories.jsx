import React, { useState, useEffect, useRef } from 'react';
import TextInput from './TextInput';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Forms/TextInput',
  component: TextInput,
  argTypes: {
    id: { control: 'text', description: 'Unique ID for the input, used for label association.' },
    label: { control: 'text', description: 'Label text for the input.' },
    type: {
      control: {
        type: 'select',
        options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      },
      description: 'Input type (e.g., text, email, password).',
    },
    placeholder: { control: 'text', description: 'Placeholder text.' },
    value: { control: 'text', description: 'Current value of the input (controlled by story state).' },
    onChange: { action: 'changed', description: 'Callback function when the value changes.' },
    error: { control: 'text', description: 'Error message to display.' },
    disabled: { control: 'boolean', description: 'Whether the input is disabled.' },
    required: { control: 'boolean', description: 'Whether the input is required.' },
    name: { control: 'text', description: 'Name attribute for the input.' },
    'aria-label': { control: 'text', description: 'ARIA label for accessibility when no visible label is present.' },
    'aria-describedby': { control: 'text', description: 'IDs of elements that describe the input.' },
    className: { control: 'text', description: 'Additional CSS classes for the wrapper div.' },
    inputClassName: { control: 'text', description: 'Additional CSS classes for the input element itself.' },
    borderColor: { control: 'text', description: 'Custom border color class (e.g., "border-brand-primary").' },
    backgroundColor: { control: 'text', description: 'Custom background color class (e.g., "bg-brand-light").' },
    // ref is not directly controllable via args, but we can demonstrate its usage.
  },
};

const Template = (args) => {
  const [internalValue, setInternalValue] = useState(args.value || '');

  useEffect(() => {
    if (args.value !== undefined && args.value !== internalValue) {
      setInternalValue(args.value);
    }
  }, [args.value]);

  const handleChange = (e) => {
    setInternalValue(e.target.value);
    args.onChange(e); // This will call the Storybook action
  };

  return <TextInput {...args} value={internalValue} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'default-name',
  label: 'Your Name',
  placeholder: 'Enter your name',
  type: 'text',
  value: '',
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  id: 'error-name',
  label: 'Your Name',
  placeholder: 'Enter your name',
  error: 'This field is required.',
  value: 'Invalid Entry',
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  ...Default.args,
  id: 'custom-style-name',
  label: 'Your Name',
  placeholder: 'Enter your name',
  borderColor: 'border-brand-primary',
  backgroundColor: 'bg-brand-light',
  className: 'p-space-sm bg-neutrals-surface-accent rounded-lg',
  inputClassName: 'text-brand-primary-dark',
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  ...Default.args,
  id: 'email-input',
  label: 'Email Address',
  placeholder: 'you@example.com',
  type: 'email',
  error: '', // Clear potential inherited error
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  ...Default.args,
  id: 'password-input',
  label: 'Password',
  placeholder: 'Enter your password',
  type: 'password',
  error: '',
};

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  ...Default.args,
  id: 'disabled-input',
  label: 'Disabled Field',
  placeholder: 'Cannot edit',
  disabled: true,
  value: 'Some read-only text',
  error: '',
};

export const RequiredInput = Template.bind({});
RequiredInput.args = {
  ...Default.args,
  id: 'required-input',
  label: 'Required Field',
  placeholder: 'This field must be filled',
  required: true,
  error: '',
};

export const AriaLabelOnly = Template.bind({});
AriaLabelOnly.args = {
  id: 'search-input',
  'aria-label': 'Search site content', // No visible label prop
  placeholder: 'Search...',
  type: 'search',
  value: '',
  error: '',
};

export const WithRef = (args) => {
  const [internalValue, setInternalValue] = useState(args.value || '');
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setInternalValue(e.target.value);
    args.onChange(e);
  };

  const handleFocusClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <button onClick={handleFocusClick} className="border rounded mb-space-sm p-space-xs">Focus Input</button>
      <TextInput {...args} ref={inputRef} value={internalValue} onChange={handleChange} />
    </div>
  );
};
WithRef.args = {
  id: 'ref-input',
  label: 'Focusable Input',
  placeholder: 'Click button to focus...',
  value: '',
};
