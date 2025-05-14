// Tooltip.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const positions = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export const Tooltip = ({
  children,
  content,
  position = 'top',
  className = '',
  delay = 150,
  backgroundColor = 'bg-black',
  textColor = 'text-white',
}) => {
  const [visible, setVisible] = useState(false);
  let timeout;

  const show = () => {
    timeout = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timeout);
    setVisible(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setVisible((prev) => !prev);
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-describedby="tooltip"
    >
      {children}
      {visible && (
        <div
          id="tooltip"
          className={clsx(
            'absolute z-10 px-space-sm py-space-xs text-sm rounded shadow-md whitespace-nowrap transition-opacity duration-300',
            positions[position],
            backgroundColor,
            textColor,
            className
          )}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  className: PropTypes.string,
  delay: PropTypes.number,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
