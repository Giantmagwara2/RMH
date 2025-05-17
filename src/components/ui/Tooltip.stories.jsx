// Tooltip.stories.jsx
import React from 'react';
import { Tooltip } from './Tooltip';

export default {
  title: 'UI/Tooltip',
  component: Tooltip,
  argTypes: {
    content: { control: 'text', description: 'The text content of the tooltip.' },
    position: {
      control: { type: 'select', options: ['top', 'bottom', 'left', 'right'] },
      description: 'Position of the tooltip relative to the trigger element.',
    },
    delay: { control: 'number', description: 'Delay in milliseconds before the tooltip appears.' },
    backgroundColor: { control: 'color', description: 'Background color of the tooltip (Tailwind class or hex).' },
    textColor: { control: 'color', description: 'Text color of the tooltip (Tailwind class or hex).' },
    className: { control: 'text', description: 'CSS classes for the wrapper div of the tooltip trigger.' },
    tooltipClassName: { control: 'text', description: 'CSS classes for the tooltip bubble itself.' },
    id: { control: 'text', description: 'Explicit ID for the tooltip content (for aria-describedby). Auto-generated if not provided.' },
    children: { control: false, description: 'The trigger element for the tooltip.' },
  },
  parameters: {
    // Add some padding around stories to ensure tooltips are fully visible
    layout: 'padded',
  }
};

const Template = ({ children, ...args }) => (
  <div style={{ margin: '50px' }}> {/* Add margin to ensure tooltips are visible */}
    <Tooltip {...args}>
      {children || <button className="text-white rounded px-space-md py-space-sm bg-brand-primary">Hover or Focus Me</button>}
    </Tooltip>
  </div>
);

export const Top = Template.bind({});
Top.args = {
  content: 'This is a top tooltip',
  position: 'top',
  id: 'tooltip-top-example',
};

export const Bottom = Template.bind({});
Bottom.args = {
  ...Top.args,
  content: 'This is a bottom tooltip',
  position: 'bottom',
  id: 'tooltip-bottom-example',
};

export const Left = Template.bind({});
Left.args = {
  ...Top.args,
  content: 'This is a left tooltip',
  position: 'left',
  id: 'tooltip-left-example',
};

export const Right = Template.bind({});
Right.args = {
  ...Top.args,
  content: 'This is a right tooltip',
  position: 'right',
  id: 'tooltip-right-example',
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  ...Top.args,
  content: 'This is a custom tooltip',
  position: 'top',
  backgroundColor: 'bg-brand-primary',
  textColor: 'text-white',
  id: 'tooltip-custom-colors-example',
};

export const CustomDelay = Template.bind({});
CustomDelay.storyName = 'Custom Delay (500ms)';
CustomDelay.args = {
  ...Top.args,
  content: 'Tooltip with a 500ms delay',
  delay: 500,
  id: 'tooltip-delay-example',
};

export const CustomTooltipStyle = Template.bind({});
CustomTooltipStyle.storyName = 'Custom Tooltip Style';
CustomTooltipStyle.args = {
  ...Top.args,
  content: 'Styled with tooltipClassName',
  tooltipClassName: 'border-2 border-feedback-info-border bg-feedback-info-bg text-feedback-info-text p-space-md rounded-lg shadow-xl',
  id: 'tooltip-custom-style-example',
};

export const WithTextTrigger = Template.bind({});
WithTextTrigger.storyName = 'Text Trigger';
WithTextTrigger.args = {
  ...Top.args,
  content: 'Tooltip for a span of text.',
  children: (
    <span tabIndex={0} className="underline decoration-dotted cursor-help">
      Helpful text
    </span>
  ),
  id: 'tooltip-text-trigger-example',
};

export const MultipleTooltips = () => (
  <div style={{ margin: '50px', display: 'flex', gap: '100px', alignItems: 'center' }}>
    <Tooltip content="First tooltip!" position="top" id="multi-tooltip-1">
      <button className="text-white rounded px-space-md py-space-sm bg-brand-secondary">Button 1</button>
    </Tooltip>
    <Tooltip content="Second tooltip, different position." position="bottom" id="multi-tooltip-2">
      <span tabIndex={0} className="p-2 border border-dashed">Focusable Span</span>
    </Tooltip>
    <Tooltip content="Third one, on the right!" position="right" id="multi-tooltip-3" tooltipClassName="bg-green-500">
      <button className="text-white rounded px-space-md py-space-sm bg-brand-accent">Button 3</button>
    </Tooltip>
  </div>
);
MultipleTooltips.storyName = 'Multiple Tooltips (Accessibility)';
