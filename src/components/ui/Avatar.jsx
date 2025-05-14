import React from 'react';

const Avatar = ({ src, alt = '', name, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-xl',
  };

  return src ? (
    <img
      src={src}
      alt={alt || `Avatar of ${name}`}
      className={`rounded-full object-cover ${sizes[size]} border border-neutrals-border`}
    />
  ) : (
    <div
      className={`rounded-full bg-neutrals-border text-text-primary flex items-center justify-center font-medium uppercase ${sizes[size]}`}
      aria-label={`Avatar placeholder for ${name}`}
    >
      {name?.[0] || '?'}
    </div>
  );
};

export default Avatar;
