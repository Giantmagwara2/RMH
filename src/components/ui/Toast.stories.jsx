// Toast.stories.jsx
import React, { useState } from 'react';
import { Toast } from './Toast';
import { action } from '@storybook/addon-actions';

export default {
  title: 'UI/Toast',
  component: Toast,
  argTypes: {
    type: {
      control: { type: 'select', options: ['info', 'success', 'warning', 'error'] },
      description: 'The type of toast, affecting its style and default icon.',
    },
    message: {
      control: 'text',
      description: 'The message content of the toast.',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function triggered when the toast is closed (either by timer or close button).',
    },
    duration: {
      control: 'number',
      description: 'Duration in milliseconds before the toast automatically closes.',
    },
    icon: { control: false, description: 'Custom icon component to display. Control disabled in Storybook.' },
    className: { control: 'text', description: 'Additional CSS classes for the toast container.' },
  },
};

const Template = (args) => {
  const [visible, setVisible] = useState(true);
  return (
    <div className="flex flex-col items-center space-y-space-sm">
      {visible && (
        <Toast
          {...args}
          onClose={() => {
            setVisible(false);
            args.onClose(); // Call the action from args
          }}
        />
      )}
      <button
        className="text-white rounded bg-brand-primary px-space-md py-space-sm"
        onClick={() => setVisible(true)}
      >
        Show Toast
      </button>
    </div>
  );
};

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  message: 'This is an info toast!',
  duration: 3000,
};

export const Success = Template.bind({});
Success.args = {
  ...Info.args,
  type: 'success',
  message: 'Operation successful!',
};

export const Warning = Template.bind({});
Warning.args = {
  ...Info.args,
  type: 'warning',
  message: 'This is a warning!',
};

export const Error = Template.bind({});
Error.args = {
  ...Info.args,
  type: 'error',
  message: 'Something went wrong.',
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  ...Info.args,
  type: 'info',
  message: 'This is a custom icon toast!',
  icon: () => <span>🌟</span>,
};

export const CustomDuration = Template.bind({});
CustomDuration.storyName = 'Custom Duration (5s)';
CustomDuration.args = {
  ...Info.args,
  message: 'This toast will disappear in 5 seconds.',
  duration: 5000,
};

export const NoAutoClose = Template.bind({});
NoAutoClose.storyName = 'No Auto-Close (Duration Infinity)';
NoAutoClose.args = {
  ...Info.args,
  message: 'This toast will not close automatically. Click the close button.',
  duration: Infinity, // Or a very large number if Infinity causes issues with setTimeout
};

export const WithCustomClassName = Template.bind({});
WithCustomClassName.args = {
  ...Info.args,
  message: 'This toast has a custom class for extra styling.',
  className: 'border-2 border-dashed border-purple-500 transform rotate-3',
};
