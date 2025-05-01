// src/components/Section/Section.jsx (assuming you renamed the file)
import React from 'react';

const Section = ({ children, className = '', ...props }) => {
  const sectionClassName = `mb-section ${className}`;
  return (
    <section className={sectionClassName} {...props}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export default Section;