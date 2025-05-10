import React, { useState } from 'react';
import Alert from './Alert';

export default {
  title: 'UI/Alert',
  component: Alert,
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    message: { control: 'text' },
  },
};

const Template = (args) => {
  const [visible, setVisible] = useState(true);
  return visible ? <Alert {...args} onClose={() => setVisible(false)} /> : null;
};

export const Info = Template.bind({});
Info.args = { variant: 'info', message: 'This is an informational alert.' };

export const Error = Template.bind({});
Error.args = { variant: 'error', message: 'This is an error alert!' };
