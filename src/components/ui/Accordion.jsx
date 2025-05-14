import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDownIcon } from '@heroicons/react/24/outline'; // Optional: Replace with your own icon if needed

// Added keyboard navigation and improved accessibility
const handleKeyDown = (event, index, items) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    const nextIndex = (index + 1) % items.length;
    document.getElementById(`accordion-button-${nextIndex}`).focus();
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    const prevIndex = (index - 1 + items.length) % items.length;
    document.getElementById(`accordion-button-${prevIndex}`).focus();
  } else if (event.key === 'Home') {
    event.preventDefault();
    document.getElementById('accordion-button-0').focus();
  } else if (event.key === 'End') {
    event.preventDefault();
    document.getElementById(`accordion-button-${items.length - 1}`).focus();
  }
};

const AccordionItem = ({
  item,
  isOpen,
  onClick,
  index,
  buttonClassName = '',
  contentClassName = '',
  IconComponent = ChevronDownIcon,
  iconClassName = '',
  items,
}) => {
  const buttonId = `accordion-button-${index}`;
  const contentId = `accordion-content-${index}`;

  return (
    <div className="border-b border-neutrals-border">
      <h3> {/* Using <h3> for semantic structure, assuming accordion titles are subheadings */}
        <button
          id={buttonId}
          onClick={onClick}
          onKeyDown={(event) => handleKeyDown(event, index, items)}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className={`flex items-center justify-between w-full font-medium text-left px-space-md py-space-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 ${buttonClassName}`.trim()}
        >
          {item.title}
          <IconComponent
            isOpen={isOpen} // Pass isOpen state to the IconComponent
            className={`w-5 h-5 transform transition-transform duration-300 ${iconClassName} ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`.trim()}
            aria-hidden="true"
          />
        </button>
      </h3>
      {isOpen && (
        <div
          id={contentId}
          role="region"
          aria-labelledby={buttonId}
          className={`px-space-md py-space-sm text-text-secondary ${contentClassName}`.trim()}
        >
          {item.content}
        </div>
      )}
    </div>
  );
};

AccordionItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Optional unique ID for the item itself
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Unique index/key for ARIA attributes
  buttonClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  IconComponent: PropTypes.elementType,
  iconClassName: PropTypes.string,
  items: PropTypes.array.isRequired,
};

const Accordion = ({
  items = [],
  className = '',
  allowMultipleOpen = false,
  // Props to pass down to AccordionItem
  buttonClassName,
  contentClassName,
  IconComponent,
  iconClassName,
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [openIndexes, setOpenIndexes] = useState(new Set());

  const toggleIndex = (index) => {
    if (allowMultipleOpen) {
      setOpenIndexes((prevIndexes) => {
        const newIndexes = new Set(prevIndexes);
        if (newIndexes.has(index)) {
          newIndexes.delete(index);
        } else {
          newIndexes.add(index);
        }
        return newIndexes;
      });
    } else {
      setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    }
  };

  return (
    <div className={`w-full ${className}`.trim()}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id || index} // Prefer item.id if available, fallback to index
          item={item}
          index={item.id || index} // Use the same key for generating ARIA ids
          isOpen={allowMultipleOpen ? openIndexes.has(item.id || index) : openIndex === (item.id || index)}
          onClick={() => toggleIndex(index)}
          // Pass down customization props
          buttonClassName={buttonClassName}
          contentClassName={contentClassName}
          IconComponent={IconComponent}
          iconClassName={iconClassName}
          items={items}
        />
      ))}
    </div>
  );
};

export default Accordion;

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Optional unique ID for stable keys
    })
  ).isRequired,
  className: PropTypes.string,
  allowMultipleOpen: PropTypes.bool, // New prop to allow multiple items to be open
  // Props for AccordionItem customization
  buttonClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  IconComponent: PropTypes.elementType,
  iconClassName: PropTypes.string,
};
