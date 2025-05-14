import React from 'react';

/**
 * Button variants and sizes map to Tailwind classes
 * which in turn use our design tokens.
 */
const VARIANT_CLASSES = {
  primary: 'bg-brand-primary hover:bg-brand-primary/90 text-soft-white hover:shadow-lg',
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
 * - fullWidth: boolean for full-width buttons
 * - ...props: other <button> props (onClick, type, etc.)
 */
const Button = React.forwardRef(
  (
    {
      children,
      className,
      type = 'button',
      disabled,
      'aria-label': ariaLabel,
      'aria-expanded': ariaExpanded,
      'aria-pressed': ariaPressed,
      'aria-busy': ariaBusy,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false, // New prop for full-width buttons
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
        className={`
          ${baseClasses} 
          ${variantClass}
          ${sizeClass} 
          ${className} 
          ${loading ? 'relative !text-transparent hover:!text-transparent' : ''}
          ${fullWidth ? 'w-full' : ''} // Apply full-width class if fullWidth is true
          transition-all duration-300 ease-in-out
          hover:scale-[1.05] active:scale-[0.95] // Enhanced hover and active states
          hover:shadow-[var(--shadow-lg)] active:shadow-[var(--shadow-sm)] // Add shadow transitions
          text-[length:var(--font-size-base)]
          md:text-[length:var(--font-size-md)]
          p-[var(--space-sm)]
          md:p-[var(--space-md)]
          rounded-[var(--radius-md)]
          shadow-[var(--shadow-md)]
          dark:shadow-none
          focus:ring-offset-[var(--space-xs)] // Improved focus ring offset
        `}
        onClick={loading ? undefined : onClick}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressed}
        aria-busy={ariaBusy}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="loader" /> {/* Add a loader animation for loading state */}
          </span>
        )}
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;