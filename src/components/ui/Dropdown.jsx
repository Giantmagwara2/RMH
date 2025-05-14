import React, { useState } from 'react';

const Dropdown = ({ label, options = [], onSelect, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        className="w-full px-4 py-2 text-left text-white bg-blue-500 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {label}
      </button>
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border rounded-md shadow-lg" role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              className="block w-full px-4 py-2 text-left hover:bg-gray-200"
              onClick={() => handleSelect(option)}
              role="option"
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
