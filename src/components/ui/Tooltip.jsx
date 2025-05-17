// Tooltip.jsx
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const positions = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

let tooltipCounter = 0; // Simple counter for unique IDs if no id prop is provided

const TooltipComponent = ({
  children,
  content,
  position = 'top',
  className = '',
  tooltipClassName = '', // Specific class for the tooltip bubble itself
  delay = 150,
  backgroundColor = 'bg-black',
  textColor = 'text-white',
  id, // Allow passing a specific ID
  ...rest // Spread additional props to the wrapper
}) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  const [generatedId, setGeneratedId] = useState('');

  useEffect(() => {
    if (!id) {
      tooltipCounter += 1;
      setGeneratedId(`tooltip-generated-${tooltipCounter}`);
    }
  }, [id]);

  const tooltipId = id || generatedId;

  const show = () => {
    clearTimeout(timeoutRef.current); // Clear any existing hide timeout
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      hide();
    } else if (event.key === 'Enter' || event.key === ' ') {
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
      tabIndex={0} // Make it focusable
      aria-describedby={visible ? tooltipId : undefined}
      {...rest}
    >
      {children}
      {visible && (
        <div
          id={tooltipId}
          className={clsx(
            'absolute z-10 px-space-sm py-space-xs text-sm rounded shadow-md whitespace-nowrap transition-opacity duration-300',
            positions[position],
            backgroundColor,
            textColor,
            tooltipClassName // Use tooltipClassName for the bubble
          )}
          role="tooltip"
          // aria-hidden={!visible} // Not strictly necessary as it's conditionally rendered
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
  id: PropTypes.string,
  tooltipClassName: PropTypes.string,
};

TooltipComponent.defaultProps = {
  position: 'top',
  className: '', // className is for the wrapper, kept for backward compatibility if used
  tooltipClassName: '',
  delay: 150,
  backgroundColor: 'bg-black',
  textColor: 'text-white',
  id: undefined,
};

TooltipComponent.displayName = 'Tooltip';

// The `className` prop on TooltipComponent applies to the wrapper.
// `tooltipClassName` is introduced for styling the tooltip bubble itself.

export const Tooltip = React.memo(TooltipComponent);
