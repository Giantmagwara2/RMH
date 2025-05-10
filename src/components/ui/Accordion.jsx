import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline'; // Optional: Replace with your own icon if needed

const AccordionItem = ({ title, children, isOpen, onClick }) => (
  <div className="border-b border-neutrals-border">
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full font-medium text-left px-space-md py-space-sm text-text-primary focus:outline-none"
    >
      {title}
      <ChevronDownIcon
        className={`w-5 h-5 transform transition-transform duration-300 ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
      />
    </button>
    {isOpen && (
      <div className="px-space-md py-space-sm text-text-secondary">
        {children}
      </div>
    )}
  </div>
);

const Accordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full divide-y divide-neutrals-border">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onClick={() => toggleIndex(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
