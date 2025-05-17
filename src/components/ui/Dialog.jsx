import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const Dialog = ({
  isOpen,
  onClose = () => {}, // Default onClose function
  title,
  children,
  actions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-space-md">
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 id="dialog-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div id="dialog-description" className="p-4 text-gray-700 dark:text-gray-300">
          {children}
        </div>
        {actions && (
          <div className="flex justify-end px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}; 

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node, // Actions can be a single element or an array
};

Dialog.displayName = 'Dialog';

export default Dialog;
