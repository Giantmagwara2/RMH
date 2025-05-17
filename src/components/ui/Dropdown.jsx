import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react'; // Using lucide-react for consistency

const Dropdown = ({ label, options = [], onSelect, className = '', placeholder = 'Select an option' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (isOpen && options.length > 0) {
      const listbox = dropdownRef.current.querySelector('[role="listbox"]');
      if (listbox) {
        const items = listbox.querySelectorAll('[role="option"]');
        if (focusedIndex >= 0 && items[focusedIndex]) {
          items[focusedIndex].focus();
        }
      }
    }
  }, [isOpen, focusedIndex, options]);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
    buttonRef.current?.focus(); // Return focus to the button
  };

  const handleKeyDown = (e) => {
    if (!isOpen && options.length > 0) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
    } else {
      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % options.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0 && options[focusedIndex]) {
            handleSelect(options[focusedIndex]);
          }
          break;
        case 'Tab':
          setIsOpen(false); // Close on tab out
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          className="flex items-center justify-between w-full py-2 pl-3 pr-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-500"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="truncate">{label || placeholder}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && options.length > 0 && (
        <ul
          className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800 dark:ring-gray-700"
          tabIndex={-1}
          role="listbox"
          aria-activedescendant={focusedIndex >= 0 ? `option-${focusedIndex}` : undefined}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`option-${index}`}
              className={`relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-50 focus:outline-none focus:bg-blue-50 dark:text-gray-100 dark:hover:bg-gray-700 ${focusedIndex === index ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : ''}`}
              role="option"
              tabIndex={-1} // Ensure items are not tabbable
              onClick={() => handleSelect(option)}
            >
              <div className="flex items-center">
                <span className="font-normal truncate">{option.label}</span>
              </div>
              {/* Add a visual indicator for selected option if needed */}
              {/* {option.selected && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                  <CheckIcon className="w-5 h-5" aria-hidden="true" />
                </span>
              )} */}
            </li>
          ))}
          {options.length === 0 && (
            <li className="relative py-2 pl-3 text-gray-500 cursor-default select-none pr-9 dark:text-gray-400">
              No options available
            </li>
          )}
        </ul>
      )}
    </div >
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any.isRequired, label: PropTypes.string.isRequired })).isRequired,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Dropdown;
