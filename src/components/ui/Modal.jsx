import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react'; // Using lucide-react for the close icon

const Modal = ({ isOpen, onClose = () => {}, title, children, className = '' }) => {
  const modalContentRef = React.useRef(null);
  const titleId = title ? `modal-title-${React.useId()}` : undefined;
  const descriptionId = children ? `modal-description-${React.useId()}` : undefined;

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) { // Only add listener if modal is open
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (isOpen && modalContentRef.current) {
      // Focus trap logic
      const focusableElements = modalContentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;
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
      firstElement.focus(); // Focus the first focusable element when modal opens
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isOpen]); // Removed modalContentRef from deps as it's stable

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={onClose} // Click outside to close (on the backdrop)
    >
      <div
        ref={modalContentRef}
        className={`relative w-full max-w-lg bg-white rounded-lg shadow-xl dark:bg-gray-800 ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          {title && (
            <h2 id={titleId} className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children && (
          <div id={descriptionId} className="p-6 space-y-6 text-gray-700 dark:text-gray-300">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

Modal.displayName = 'Modal';

export default Modal;