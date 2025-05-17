import React, { useState } from 'react';
import Select from './Select';

export default {
  title: 'UI/Select',
  component: Select,
  argTypes: {
    id: { control: 'text', description: 'ID for the select element and label association.' },
    label: { control: 'text', description: 'Label for the select input.' },
    name: { control: 'text', description: 'Name attribute for the select element.' },
    options: { control: 'object', description: 'Array of options ({label, value}).' },
    value: { control: 'text', description: 'The currently selected value.' }, // Control as text for simplicity
    onChange: { action: 'changed', description: 'Callback function when selection changes.' },
    placeholder: { control: 'text', description: 'Placeholder text for the default option.' },
    error: { control: 'text', description: 'Error message to display.' },
    disabled: { control: 'boolean', description: 'Whether the select is disabled.' },
    required: { control: 'boolean', description: 'Whether the select is required.' },
    'aria-label': { control: 'text', description: 'ARIA label for accessibility, especially if no visible label.' },
    className: { control: 'text', description: 'Custom CSS classes for the wrapper div.' },
    selectClassName: { control: 'text', description: 'Custom CSS classes for the select element itself.' },
  },
};

const options = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Backend Developer', value: 'backend' },
  { label: 'Fullstack Developer', value: 'fullstack' },
];

const Template = (args) => {
  // Use a local state for value if not controlled by Storybook args directly for dynamic updates
  // However, for argTypes control, it's often better to let Storybook manage the value prop.
  // For this example, we'll assume Storybook controls the 'value' for simplicity in demonstration.
  // If you need internal state for a story, you can adapt this.
  const [currentValue, setCurrentValue] = useState(args.value || '');

  return (
    <Select
      {...args}
      value={currentValue}
      onChange={(e) => {
        setCurrentValue(e.target.value);
        args.onChange(e); // Call the action from argTypes
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'role-select',
  label: 'Role',
  name: 'role',
  options: options,
  placeholder: 'Choose a role',
  value: '', // Initial value
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args, // Reuse default args
  id: 'role-error',
  name: 'role-error',
  error: 'This field is required.',
  value: '', // Ensure it shows error state if value is empty and required
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  id: 'role-disabled',
  name: 'role-disabled',
  disabled: true,
  value: 'frontend', // Show a value even when disabled
};

export const Required = Template.bind({});
Required.args = {
  ...Default.args,
  id: 'role-required',
  name: 'role-required',
  label: 'Role (Required)',
  required: true,
};

export const DynamicOptions = Template.bind({});
DynamicOptions.args = {
  id: 'dynamic-select',
  label: 'Dynamic Role',
  name: 'dynamic-role',
  const dynamicOptions = [
    { label: 'Dynamic A', value: 'dynamic-a' },
    { label: 'Dynamic B', value: 'dynamic-b' },
    { label: 'Dynamic C', value: 'dynamic-c' },
  ];
  options: dynamicOptions,
  placeholder: 'Choose a dynamic role',
  value: '',
};
