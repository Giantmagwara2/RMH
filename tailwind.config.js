// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // If your main index.html is at the root
    './public/index.html', // If your main index.html is in public (often the case)
    './src/**/*.{js,jsx,ts,tsx}', // For all JS/JSX/TS/TSX files in the src directory
    // Add other top-level directories if they contain files using Tailwind classes, e.g.:
    // './pages/**/*.{js,jsx,ts,tsx}', // If you have a separate top-level 'pages' directory
  ],
  darkMode: 'class', // Enables dark mode with the 'class' strategy
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)', // Added to make font-serif utility available
        heading: 'var(--font-heading)',
      },
      fontWeight: {
        // Consider defining a distinct --font-weight-extralight token (e.g., 200)
        // if you need a visually different weight from 'light'.
        // If --font-weight-light is, for example, 300, then 'extralight' and 'light'
        // utilities will currently produce the same result.
        extralight: 'var(--font-weight-light)',
        light: 'var(--font-weight-light)',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        md: ['1.125rem', { lineHeight: '1.75rem' }],
        lg: ['1.25rem', { lineHeight: '1.75rem' }],
        xl: ['1.5rem', { lineHeight: '2rem' }],
        '2xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '3xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '4xl': ['3rem', { lineHeight: '1.2' }],
        '5xl': ['3.75rem', { lineHeight: '1.1' }],
        '6xl': ['4.5rem', { lineHeight: '1.1' }],
      },
      spacing: {
        'space-0': '0px',
        'space-xs': '4px',
        'space-sm': '8px',
        'space-md': '16px',
        'space-lg': '24px',
        'space-xl': '32px',
        'space-2xl': '40px',
        'space-3xl': '48px',
        'space-4xl': '64px',
        '128': '32rem',
        '144': '36rem',
      },
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          'primary-hover': 'var(--color-brand-primary-hover)', // If token exists
          'primary-dark': 'var(--color-brand-primary-dark)', // For text-brand-primary-dark
          secondary: 'var(--color-brand-secondary)',
          'secondary-hover': 'var(--color-brand-secondary-hover)', // If token exists
          accent: 'var(--color-brand-accent)',
          'accent-hover': 'var(--color-brand-accent-hover)', // If token exists
          light: 'var(--color-brand-light)', // For bg-brand-light
        },
        // Theme-aware colors using CSS variables from tokens.css
        // Tailwind will automatically use the correct value based on .dark class
        bg: {
          DEFAULT: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          'surface-accent': 'var(--color-surface-accent)',
          secondary: 'var(--color-bg-secondary)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          disabled: 'var(--color-text-disabled)',
          muted: 'var(--color-muted)', // Now uses CSS variable
        },
        border: {
          DEFAULT: 'var(--color-border)',
          // Specific border colors like error, info, etc., are now under 'feedback'
        },
        neutrals: {
          surface: 'var(--color-neutrals-surface)',
          'surface-accent': 'var(--color-neutrals-surface-accent)',
          border: 'var(--color-neutrals-border)', // Used as bg-neutrals-border in Table
        },
        feedback: {
          success: {
            DEFAULT: 'var(--color-feedback-success)', // For bg-feedback-success
            text: 'var(--color-feedback-success-text)',
            hover: 'var(--color-feedback-success-hover)', // For text hover
            border: 'var(--color-feedback-success-border)', // If exists
          },
          error: {
            DEFAULT: 'var(--color-feedback-error)', // For bg-feedback-error
            text: 'var(--color-feedback-error-text)',
            border: 'var(--color-feedback-error-border)', // For border-error-border
          },
          warning: {
            DEFAULT: 'var(--color-feedback-warning)', // For bg-feedback-warning
            text: 'var(--color-feedback-warning-text)', // For text-feedback-warning-text
            border: 'var(--color-feedback-warning-border)', // If exists
          },
          info: {
            DEFAULT: 'var(--color-feedback-info)', // For bg-feedback-info
            text: 'var(--color-feedback-info-text)',
            bg: 'var(--color-feedback-info-bg)', // For bg-feedback-info-bg
            border: 'var(--color-feedback-info-border)',
          },
        },
        highlight: 'var(--color-highlight)',
        overlay: 'var(--color-overlay)',
      },
      opacity: {
        50: '0.5',
        75: '0.75',
        90: '0.9',
      },
      zIndex: {
        modal: 1000,
        dropdown: 1050,
        tooltip: 1100,
      },
      lineHeight: {
        tight: '1.25',
        relaxed: '1.75',
      },
      letterSpacing: {
        tight: '-0.05em',
        wide: '0.05em',
      },
      transitionTimingFunction: {
        soft: 'var(--ease-in-out)', // Using token
      },
      transitionDuration: {
        DEFAULT: 'var(--duration-default)', // Using token
        fast: 'var(--duration-fast)',       // Using token
        slow: 'var(--duration-slow)',       // Using token
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.05)',
        navbar: '0 2px 12px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out',
        fadeIn: 'fadeIn 0.5s ease-in',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
