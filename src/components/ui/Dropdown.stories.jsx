import React from 'react';
import Dropdown from './Dropdown';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
};

const Template = (args) => {
  const handleSelect = (option) => {
    // Removed console.log(option);
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

// Added a story to demonstrate accessibility with aria-expanded and aria-haspopup
export const AccessibleDropdown = Template.bind({});
AccessibleDropdown.args = {
  label: 'Accessible Dropdown',
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ],
};
