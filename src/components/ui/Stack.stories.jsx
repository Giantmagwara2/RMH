// /src/components/ui/Stack.stories.jsx
import React from 'react';
import Stack from './Stack'; // Changed to default import

export default {
  title: 'UI/Layout/Stack',
  component: Stack,
  argTypes: {
    gap: {
      control: 'text',
      description: "Tailwind spacing class part (e.g., 'sm', 'md', 'lg', '4', '8'). Prepends 'space-y-' or 'space-x-'.",
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Direction of the stack.',
    },
    as: {
      control: 'select',
      options: ['div', 'ul', 'nav', 'section', 'article'],
      description: 'HTML element to render the stack as.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the stack container.',
    },
    children: {
      control: 'text', // Basic control, can be more complex if needed
      description: 'Content to be rendered inside the stack.',
    },
  },
};

const Template = (args) => (
  <Stack {...args}>
    {args.children || ( // Default children if not provided in args
      <>
        <div className="p-4 text-white bg-purple-500 rounded-md shadow-md">Item 1</div>
        <div className="p-4 text-white bg-purple-500 rounded-md shadow-md">Item 2</div>
        <div className="p-4 text-white bg-purple-500 rounded-md shadow-md">Item 3</div>
      </>
    )}
  </Stack>
);

export const DefaultVertical = Template.bind({});
DefaultVertical.args = {
  gap: '4', // Using Tailwind's direct spacing scale (e.g., space-y-4)
  direction: 'vertical',
};
DefaultVertical.storyName = 'Default (Vertical)';

export const WithDifferentGaps = () => (
  <>
    <h3 className="mb-2 text-lg font-semibold">Small Gap (gap: '2')</h3>
    <Stack gap="2" className="mb-6">
      <div className="p-3 text-white bg-indigo-500 rounded-md">Item A</div>
      <div className="p-3 text-white bg-indigo-500 rounded-md">Item B</div>
    </Stack>
    <h3 className="mb-2 text-lg font-semibold">Medium Gap (gap: '4')</h3>
    <Stack gap="4" className="mb-6">
      <div className="p-3 text-white bg-indigo-500 rounded-md">Item C</div>
      <div className="p-3 text-white bg-indigo-500 rounded-md">Item D</div>
    </Stack>
    <h3 className="mb-2 text-lg font-semibold">Large Gap (gap: '8')</h3>
    <Stack gap="8">
      <div className="p-3 text-white bg-indigo-500 rounded-md">Item E</div>
      <div className="p-3 text-white bg-indigo-500 rounded-md">Item F</div>
    </Stack>
  </>
);

export const Horizontal = Template.bind({});
Horizontal.args = {
  gap: '4',
  direction: 'horizontal',
};

export const AsList = Template.bind({});
AsList.args = {
  as: 'ul',
  gap: '3',
  direction: 'vertical',
  className: 'list-disc list-inside p-4 bg-gray-100 rounded-md dark:bg-gray-800',
  children: (
    <>
      <li className="p-2 text-gray-700 rounded-md bg-gray-50 dark:text-gray-300 dark:bg-gray-700">List Item 1</li>
      <li className="p-2 text-gray-700 rounded-md bg-gray-50 dark:text-gray-300 dark:bg-gray-700">List Item 2</li>
      <li className="p-2 text-gray-700 rounded-md bg-gray-50 dark:text-gray-300 dark:bg-gray-700">List Item 3</li>
    </>
  ),
};
AsList.storyName = 'Stack as UL';