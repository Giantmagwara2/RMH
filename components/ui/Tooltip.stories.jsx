// Tooltip.stories.jsx
import React from 'react';
import { Tooltip } from './Tooltip';

export default {
  title: 'UI/Tooltip',
  component: Tooltip,
};

const Template = (args) => (
  <Tooltip {...args}>
    <button className="text-white rounded px-space-md py-space-sm bg-brand-primary">Hover me</button>
  </Tooltip>
);

export const Top = Template.bind({});
Top.args = {
  content: 'This is a top tooltip',
  position: 'top',
};

export const Bottom = Template.bind({});
Bottom.args = {
  content: 'This is a bottom tooltip',
  position: 'bottom',
};

export const Left = Template.bind({});
Left.args = {
  content: 'This is a left tooltip',
  position: 'left',
};

export const Right = Template.bind({});
Right.args = {
  content: 'This is a right tooltip',
  position: 'right',
};
