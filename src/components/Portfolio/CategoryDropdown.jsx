// src/components/Portfolio/CategoryDropdown.jsx
import React, { useRef, useState, useEffect } from 'react';

const CategoryDropdown = ({ categories, selectedCategory, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef(null);
  const itemRefs = useRef([]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (!isOpen) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusedIndex((prev) => {
        const nextIndex = prev + 1 < categories.length ? prev + 1 : 0;
        itemRefs.current[nextIndex]?.focus();
        return nextIndex;
      });
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusedIndex((prev) => {
        const nextIndex = prev - 1 >= 0 ? prev - 1 : categories.length - 1;
        itemRefs.current[nextIndex]?.focus();
        return nextIndex;
      });
    }

    if (event.key === 'Enter' && focusedIndex >= 0) {
      onSelect(categories[focusedIndex]);
      setIsOpen(false);
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select project category"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        {selectedCategory}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
        >
          {categories.map((category, idx) => (
            <button
              key={category}
              ref={(el) => (itemRefs.current[idx] = el)}
              role="menuitem"
              tabIndex={0}
              onClick={() => {
                onSelect(category);
                setIsOpen(false);
              }}
              onKeyDown={handleKeyDown}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-none ${
                selectedCategory === category ? 'bg-indigo-50 font-semibold' : ''
              }`}
              aria-selected={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
