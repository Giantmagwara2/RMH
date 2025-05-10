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
