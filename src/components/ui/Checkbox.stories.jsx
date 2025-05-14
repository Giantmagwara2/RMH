import React, { useState } from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const Template = (args) => {
  const [checked, setChecked] = useState(false);
  return <Checkbox {...args} checked={checked} onChange={e => setChecked(e.target.checked)} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'agree',
  label: 'I agree to the terms',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'agree-dis',
  label: 'I agree to the terms',
  disabled: true,
};

// Added a story to demonstrate accessibility with aria-checked
export const AccessibleCheckbox = Template.bind({});
AccessibleCheckbox.args = {
  id: 'accessible-checkbox',
  label: 'Accessible Checkbox',
};
