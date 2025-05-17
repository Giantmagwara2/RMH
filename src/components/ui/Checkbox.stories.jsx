import React, { useState } from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

// Template for stories with useState for checked state
const Template = (args) => {
  const [checked, setChecked] = useState(false);
  return <Checkbox {...args} checked={checked} onChange={e => setChecked(e.target.checked)} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'agree',
  label: 'Default Checkbox',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'agree-dis',
  label: 'Disabled Checkbox',
  disabled: true,
};

export const Sizes = () => (
  <div className="flex space-x-4">
    {Template.bind({})({ id: 'small', label: 'Small', size: 'sm' })}
    {Template.bind({})({ id: 'medium', label: 'Medium', size: 'md' })}
    {Template.bind({})({ id: 'large', label: 'Large', size: 'lg' })}
  </div>
);

Sizes.parameters = {
  docs: {
    description: {
      story: 'Demonstrates different sizes of the checkbox component.',
    },
  },
};

export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
  id: 'custom-label',
  label: (
    <span>I agree to the <a href="#" className="text-blue-500">terms and conditions</a></span>
  ),
};
