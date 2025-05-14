import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-space-md">
      <div
        className="fixed inset-0 bg-neutrals-surface/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-md bg-white rounded-md shadow-xl dark:bg-neutrals-surface"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <div className="flex items-center justify-between border-b border-neutrals-border px-space-md py-space-sm">
          <h3 id="dialog-title" className="text-lg font-semibold text-text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="transition-colors text-text-secondary hover:text-text-primary"
            aria-label="Close"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <div id="dialog-description" className="p-space-md text-text-secondary">{children}</div>
        {actions && (
          <div className="flex justify-end border-t gap-space-sm px-space-md py-space-sm border-neutrals-border">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;
