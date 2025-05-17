import React from 'react';
import Dropdown from './Dropdown';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
};
// Define a template for consistent story rendering
const Template = (args) => {
    const handleSelect = (option) => {
        console.log('Selected:', option); // You can add more complex handling here in your app
    };
    return <Dropdown {...args} onSelect={handleSelect} />;
};

export const BasicDropdown = Template.bind({});
BasicDropdown.args = {
    label: 'Basic Dropdown',
    options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ],
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    placeholder: 'Select an option',
    options: [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
    ],
};

export const LongOptions = Template.bind({});
LongOptions.args = {
    label: 'Dropdown with Long Options',
    options: [
        { label: 'A very long option label that might overflow', value: 'long1' },
        { label: 'Another option with a rather lengthy description', value: 'long2' },
        { label: 'Short and sweet', value: 'short' },
    ],
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
    label: 'Dropdown with Custom Width',
    options: [
        { label: 'Choice A', value: 'ca' },
        { label: 'Choice B', value: 'cb' },
    ],
    className: 'w-64', // Tailwind class for a specific width (e.g., 256px)
};

export const NoOptions = Template.bind({});
NoOptions.args = {
    label: 'Dropdown without options',
    options: [],
};

// You can add more stories to showcase other features like disabled state, custom styling, etc.
// For example:
// export const DisabledDropdown = Template.bind({});
// DisabledDropdown.args = { ...BasicDropdown.args, disabled: true };
