import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (isOpen) {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isOpen]);

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