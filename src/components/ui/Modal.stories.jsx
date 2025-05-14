import React, { useState } from 'react';
import Modal from './Modal';

export default {
  title: 'UI/Modal',
  component: Modal,
};

export const Default = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-white rounded bg-brand-primary px-space-md py-space-sm"
      >
        Open Modal
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Welcome to RocVille"
      >
        <p className="text-text-secondary">
          This is a modal component built with Tailwind and design tokens. You can place any custom content here.
        </p>
      </Modal>
    </>
  );
};

export const WithFocusTrap = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-white rounded bg-brand-primary px-space-md py-space-sm"
      >
        Open Modal with Focus Trap
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Focus Trapped Modal"
      >
        <p className="text-text-secondary">
          This modal traps focus within its content. Use Tab and Shift+Tab to navigate.
        </p>
        <button className="text-white rounded mt-space-md bg-brand-primary px-space-md py-space-sm">
          Confirm
        </button>
        <button className="text-white rounded mt-space-md ml-space-sm bg-semantic-error px-space-md py-space-sm">
          Cancel
        </button>
      </Modal>
    </>
  );
};
