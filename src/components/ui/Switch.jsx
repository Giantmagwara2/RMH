import React from 'react';

const Switch = ({ checked, onChange, disabled, color = 'bg-brand-primary', className = '' }) => {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${checked ? color : 'bg-neutrals-border'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-labelledby="switch-label"
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

export default Switch;
