import React, { useState } from 'react';
import RadioGroup from './RadioGroup';

export default {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  argTypes: {
    name: { control: 'text', description: 'The name attribute for all radio buttons in the group.' },
    legend: { control: 'text', description: 'A legend for the fieldset.' },
    options: { control: 'object', description: 'Array of options for radio buttons ({label, value}).' },
    selectedValue: { control: 'text', description: 'The currently selected value.' }, // Or 'radio' if options are static
    onChange: { action: 'changed', description: 'Callback function when selection changes.' },
    error: { control: 'text', description: 'Error message to display for the group.' },
    className: { control: 'text', description: 'Additional CSS classes for the fieldset.' },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation of the radio buttons.',
    },
    // Note: Individual RadioButton props like 'size' or 'disabled' for specific options
    // are not directly controlled at the RadioGroup level in this story setup.
    // They would be part of the 'options' object if needed, or demonstrated in RadioButton.stories.jsx.
  },
};

const Template = (args) => {
  const [value, setValue] = useState(args.selectedValue || (args.options.length > 0 ? args.options[0].value : ''));
  return <RadioGroup {...args} selectedValue={value} onChange={(newValue) => { args.onChange(newValue); setValue(newValue); }} />;
};

export const Default = Template.bind({});
Default.args = {
  name: 'choices',
  options: [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ],
};
Default.storyName = 'Default (Vertical)';

export const HorizontalLayout = Template.bind({});
HorizontalLayout.args = {
  ...Default.args, // Reuse options from Default
  name: 'choices-horizontal',
  legend: 'Choose Horizontally',
  orientation: 'horizontal',
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args, // Reuse options from Default
  name: 'choices-error',
  legend: 'Selection with Error',
  error: 'Please select an option.',
  selectedValue: '', // Start with no selection to show error
};

export const WithLegend = Template.bind({});
WithLegend.args = {
  ...Default.args,
  name: 'choices-legend',
  legend: 'Please select your preference',
};

export const Preselected = Template.bind({});
Preselected.args = {
  ...Default.args,
  name: 'choices-preselected',
  legend: 'Preselected Option',
  selectedValue: 'b', // Preselect Option B
  options: [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ],
};

export const DynamicOptions = () => {
  const [value, setValue] = useState('');
  const options = [
    { label: 'Dynamic A', value: 'dynamic-a' },
    { label: 'Dynamic B', value: 'dynamic-b' },
    { label: 'Dynamic C', value: 'dynamic-c' },
  ];

  return (
    <RadioGroup
      name="dynamic-choices"
      legend="Dynamically Generated Options"
      options={options}
      selectedValue={value}
      onChange={setValue}
    />
  );
};

export const WithDisabledOptionInGroup = (args) => {
  const [value, setValue] = useState('enabled-a');
  const optionsWithDisabled = [
    { label: 'Enabled A', value: 'enabled-a' },
    { label: 'Disabled B', value: 'disabled-b', disabled: true }, // Individual RadioButton would need to handle this
    { label: 'Enabled C', value: 'enabled-c' },
  ];
  // Note: The current RadioGroup doesn't directly pass 'disabled' to RadioButton from options.
  // This story highlights a potential enhancement for RadioGroup or shows how to structure options
  // if RadioButton were to accept a 'disabled' prop from the options object.
  // For now, all radio buttons in the group are either enabled or disabled by the group's own disabled prop (if it had one).
  return (
    <RadioGroup
      name="disabled-example"
      legend="Group with a (conceptually) disabled option"
      options={optionsWithDisabled.map(opt => ({ ...opt, label: opt.disabled ? `${opt.label} (Visually Disabled)` : opt.label }))} // Visual cue
      selectedValue={value}
      onChange={setValue}
      {...args}
    />
  );
};
WithDisabledOptionInGroup.storyName = 'Group with Disabled Option (Conceptual)';
