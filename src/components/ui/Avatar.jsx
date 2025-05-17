import React from 'react';
import PropTypes from 'prop-types';
import { User } from 'lucide-react'; // Assuming lucide-react is used for icons

const Avatar = ({ 
  src, 
  alt = '', 
  name, 
  size = 'md',
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',       // 32px
    md: 'w-10 h-10 text-base',   // 40px (default)
    lg: 'w-12 h-12 text-lg',   // 48px
    xl: 'w-16 h-16 text-xl',   // 64px
    '2xl': 'w-20 h-20 text-2xl', // 80px
  };

  const style = sizes[size] || sizes.md;

  const avatarContent = src ? (
    <img src={src} alt={alt || `Avatar of ${name}`} className="object-cover w-full h-full rounded-full" />
  ) : name ? (
    <span className="font-medium uppercase">{name[0]}</span>
  ) : (
    <User size="100%" /> // Or another suitable icon, adjust size as needed
  );

  return (
    <div 
      className={`rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${style} ${className}`}
      aria-label={name ? `Avatar of ${name}` : 'Avatar'}
      {...props}
    >
      {avatarContent}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
  className: PropTypes.string,
};

export default Avatar;
