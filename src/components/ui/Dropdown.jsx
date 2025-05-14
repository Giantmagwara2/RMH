import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'; // Or your preferred icon

const Dropdown = ({ label, options = [], onSelect, className = '' }) => {
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
      const items = dropdownRef.current.querySelectorAll('[role="option"]');
      if (focusedIndex >= 0 && items[focusedIndex]) {
        items[focusedIndex].focus();
      }
    }
  }, [isOpen, focusedIndex, options.length]);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
    buttonRef.current?.focus(); // Return focus to the button
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
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
      <button
        ref={buttonRef}
        className="inline-flex items-center justify-between w-full px-space-sm py-space-xs text-left rounded-md border border-neutrals-border bg-neutrals-surface text-text-primary hover:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {label}
        <ChevronDownIcon className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 overflow-auto bg-neutrals-surface border rounded-md shadow-lg max-h-60 border-neutrals-border" role="listbox" tabIndex={-1}>
          {options.map((option, index) => (
            <button
              key={option.value}
              className={`block w-full px-space-sm py-space-xs text-left text-text-primary hover:bg-brand-primary/10 focus:bg-brand-primary/10 focus:outline-none ${focusedIndex === index ? 'bg-brand-primary/10' : ''}`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={focusedIndex === index} // Or based on actual selected value if dropdown shows current selection
              tabIndex={-1} // Individual items are not tabbable, navigation is via arrow keys
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
