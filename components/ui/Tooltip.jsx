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

  return (
    <div className="relative inline-block" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {visible && (
        <div
          className={clsx(
            'absolute z-10 px-space-sm py-space-xs text-sm text-white bg-black rounded shadow-md whitespace-nowrap transition-opacity duration-300',
            positions[position],
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
};
