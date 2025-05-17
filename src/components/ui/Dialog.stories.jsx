import React, { useState } from 'react';
import Dialog from './Dialog';
import Button from './Button';

export default {
  title: 'Components/UI/Dialog', // Changed to a more standard categorization
  component: Dialog,
  argTypes: {
    isOpen: { control: 'boolean', description: 'Controls the visibility of the dialog' },
    title: { control: 'text', description: 'Title of the dialog' },
    children: { control: 'text', description: 'Content within the dialog' },
    actions: { control: 'array', description: 'Array of action buttons' },
  },
};

const Template = (args) => {
  const [open, setOpen] = useState(args.isOpen || false); // Controlled open state

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Default Dialog',
  children: 'This is the default dialog content.',
  actions: [
    <Button key="cancel" variant="secondary" onClick={() => setOpen(false)}>
      Cancel
    </Button>,
    <Button key="confirm" onClick={() => alert('Confirmed!')}>
      Confirm
    </Button>,
  ],
};
