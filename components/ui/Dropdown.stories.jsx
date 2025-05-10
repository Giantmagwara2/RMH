import React from 'react';
import Dropdown from './Dropdown';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
};

const Template = (args) => {
  const handleSelect = (option) => {
    console.log(option);
  };

  return <Dropdown {...args} onSelect={handleSelect} />;
};

export const BasicDropdown = Template.bind({});
BasicDropdown.args = {
  label: 'Select an option',
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ],
};
