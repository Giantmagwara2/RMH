import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-lg rounded-lg shadow-xl bg-neutrals-surface p-space-lg">
        <button
          onClick={onClose}
          className="absolute top-space-sm right-space-sm text-text-tertiary hover:text-text-primary"
          aria-label="Close modal"
        >
          ✕
        </button>
        {title && <h2 className="text-lg font-semibold text-text-primary mb-space-md">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
