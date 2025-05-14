import React, { useState } from 'react';
import RadioGroup from './RadioGroup';

export default {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
};

const Template = (args) => {
  const [value, setValue] = useState(args.options[0].value);
  return <RadioGroup {...args} selectedValue={value} onChange={setValue} />;
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

export const WithError = Template.bind({});
WithError.args = {
  name: 'choices',
  options: [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ],
  error: 'Please select an option.',
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
      name="dynamic"
      options={options}
      selectedValue={value}
      onChange={setValue}
    />
  );
};
