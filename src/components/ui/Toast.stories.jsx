// Toast.stories.jsx
import React, { useState } from 'react';
import { Toast } from './Toast';

export default {
  title: 'UI/Toast',
  component: Toast,
};

const Template = (args) => {
  const [visible, setVisible] = useState(true);
  return (
    <div className="flex flex-col items-center space-y-space-sm">
      {visible && (
        <Toast
          {...args}
          onClose={() => setVisible(false)}
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
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  message: 'Operation successful!',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  message: 'This is a warning!',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  message: 'Something went wrong.',
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  type: 'info',
  message: 'This is a custom icon toast!',
  icon: () => <span>🌟</span>,
};
