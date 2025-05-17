import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button'; // Import Button for triggering modal

export default {
  title: 'UI/Modal',
  component: Modal,
  argTypes: {
    isOpen: { table: { disable: true } }, // Controlled by story logic
    onClose: { table: { disable: true } }, // Controlled by story logic
    title: { control: 'text', description: 'Title of the modal' },
    children: { control: 'text', description: 'Content of the modal (can be JSX)' },
    className: { control: 'text', description: 'Additional CSS classes for the modal content area' },
  },
};

const Template = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
      >
        Open Modal
      </Button>
      <Modal
        {...args} // Pass story args to Modal
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        {/* Children can be passed as args or directly here */}
        {args.children || (
          <p className="text-gray-700 dark:text-gray-300">
            This is the default modal content. You can customize it via the controls.
          </p>
        )}
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Welcome to RocVille',
  children: (
    <p className="text-gray-700 dark:text-gray-300">
      This is a modal component. You can place any custom content here.
      It supports keyboard navigation (Escape to close, Tab for focus trapping) and clicking outside to close.
    </p>
  ),
};

export const WithInteractiveElements = Template.bind({});
WithInteractiveElements.args = {
  title: 'Interactive Modal',
  children: (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300">
        This modal demonstrates focus trapping. Use Tab and Shift+Tab to navigate between the buttons.
      </p>
      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={() => alert('Cancel clicked!')}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => alert('Confirm clicked!')}>
          Confirm
        </Button>
      </div>
    </div>
  ),
};
WithInteractiveElements.storyName = 'Modal with Focus Trap';

export const LongContent = Template.bind({});
LongContent.args = {
  title: 'Modal with Long Content',
  children: (
    <div className="space-y-2 text-gray-700 dark:text-gray-300">
      {Array.from({ length: 15 }).map((_, i) => (
        <p key={i}>
          This is line number {i + 1} of some long content to demonstrate scrolling within the modal body if needed.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      ))}
    </div>
  ),
};

export const CustomStyledModal = Template.bind({});
CustomStyledModal.args = {
  title: 'Custom Styled Modal',
  children: 'This modal has additional custom styling via the className prop.',
  className: 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-800',
};
