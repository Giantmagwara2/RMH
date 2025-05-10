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
