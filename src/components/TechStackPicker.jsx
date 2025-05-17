import React, { useState } from 'react';
import PropTypes from 'prop-types';

const techOptions = ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'Ruby'];

export function TechStackPicker({ onSelect, initialTech = '' }) {
  const [selectedTech, setSelectedTech] = useState('');

  // Use a useEffect to initialize selectedTech if initialTech is provided
  React.useEffect(() => {
    if (initialTech) {
      setSelectedTech(initialTech);
    }
  }, [initialTech]);

  const handleTechChange = (event) => {
    const newTech = event.target.value; // Get value from select element
    setSelectedTech(newTech);
    onSelect(newTech);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="mb-4 text-lg font-bold">Select a Tech Stack</h2>
      <select
        value={selectedTech} // Bind value to state
        onChange={handleTechChange}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Select...</option> {/* Default option */}
        {techOptions.map((tech) => (
          <option key={tech} value={tech}>
            {tech}
          </option>
        ))}
      </select>
    </div>
  );
}

TechStackPicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
  initialTech: PropTypes.string,
};
