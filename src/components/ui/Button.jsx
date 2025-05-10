import React from 'react';

/**
 * Button variants and sizes map to Tailwind classes
 * which in turn use our design tokens.
 */
const VARIANT_CLASSES = {
  primary: 'bg-brand-primary hover:bg-brand-primary/90 text-soft-white',
  secondary: 'bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary/10',
  success: 'bg-semantic-success hover:bg-semantic-success/90 text-soft-white',
  danger: 'bg-semantic-error hover:bg-semantic-error/90 text-soft-white',
};

const SIZE_CLASSES = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

/**
 * A reusable Button component.
 *
 * Props:
 * - variant: one of the keys in VARIANT_CLASSES
 * - size: one of the keys in SIZE_CLASSES
 * - disabled: boolean
 * - className: additional classes
 * - ...props: other <button> props (onClick, type, etc.)
 */
const Button = React.forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      className = '',
      children,
      loading = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded transition duration-default ease-soft focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseClasses} ${variantClass} ${sizeClass} ${className} ${loading ? 'relative !text-transparent hover:!text-transparent' : ''}`}
        onClick={loading ? undefined : onClick}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;