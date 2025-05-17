// /src/components/ui/FlexRow.stories.jsx
import React from 'react';
import FlexRow from './FlexRow';

export default {
  title: 'UI/Layout/FlexRow',
  component: FlexRow,
  argTypes: {
    gap: { control: 'text' },
    justifyContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    },
    alignItems: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
    },
    customGap: { control: 'text' },
  },
};

const Template = (args) => (
  <FlexRow {...args}>
    {args.children || (
      <>
        <div className="p-4 text-white bg-blue-500 rounded-md">Item 1</div>
        <div className="p-4 text-white bg-blue-500 rounded-md">Item 2</div>
      </>
    )}
  </FlexRow>
);

export const Default = Template.bind({});
Default.args = {
  gap: '4', // Using Tailwind's spacing scale
};

export const WithAlignment = Template.bind({});
WithAlignment.args = {
  gap: '4',
  alignItems: 'center',
  children: (
    <>
      <div className="p-2 text-white bg-blue-500 rounded-md">Item 1</div>
      <div className="p-4 text-white bg-blue-500 rounded-md">Item 2 (taller)</div>
    </>
  ),
};

export const WithJustification = Template.bind({});
WithJustification.args = {
  gap: '4',
  justifyContent: 'between',
};

export const CustomGap = Template.bind({});
CustomGap.args = {
  customGap: 'gap-8', // Using Tailwind's gap utilities directly
};

export const WithWrap = Template.bind({});
WithWrap.args = {
  gap: '4',
  className: 'max-w-md', // Constrain width to demonstrate wrapping
  children: Array(6).fill().map((_, i) => (
    <div key={i} className="w-32 p-4 text-white bg-blue-500 rounded-md">
      Item {i + 1}
    </div>
  )),
};

// Added a story to demonstrate manual styling override
export const OverrideStyles = Template.bind({});
OverrideStyles.args = {
  gap: '4',
  style: { backgroundColor: 'lightgray', padding: '1rem' },
};