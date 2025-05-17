// Design Tokens
// These JavaScript tokens should reflect the light mode values from src/styles/tokens.css
// for consistency if used in JS-in-CSS solutions or dynamic styling.

const tokens = {
  colors: {
    brand: {
      primary: '#3B82F6', // from --color-brand-primary
      primaryHover: '#2563EB', // from --color-brand-primary-hover
      primaryDark: '#1E40AF', // from --color-brand-primary-dark
      secondary: '#1D4ED8', // from --color-brand-secondary
      secondaryHover: '#1E40AF', // from --color-brand-secondary-hover
      accent: '#F59E0B', // from --color-brand-accent
      accentHover: '#D97706', // from --color-brand-accent-hover
      light: '#EFF6FF', // from --color-brand-light
      // Original JS tokens not in CSS:
      // secondaryPurple: '#9333EA', // Original 'secondary' from JS tokens
      // primaryActiveLegacy: '#1E3A8A', // Original 'primaryActive' from JS tokens
    },
    bg: {
      DEFAULT: '#FAFAFA', // from --color-bg
      surface: '#FFFFFF', // from --color-surface
      surfaceAccent: '#F1F5F9', // from --color-neutrals-surface-accent (used as bg)
      secondary: '#F1F5F9', // Assuming --color-bg-secondary is similar to slate-100 for light mode
    },
    text: {
      primary: '#1A202C', // from --color-text-primary
      secondary: '#4A5568', // from --color-text-secondary
      disabled: '#94A3B8', // from --color-text-disabled
      muted: '#718096', // from --color-muted
    },
    border: {
      DEFAULT: '#E2E8F0', // from --color-border
    },
    neutrals: { // Reflecting UI Neutrals from tokens.css (slate based)
      surface: '#FFFFFF', // from --color-neutrals-surface
      surfaceAccent: '#F1F5F9', // from --color-neutrals-surface-accent
      border: '#CBD5E1', // from --color-neutrals-border
    },
    feedback: {
      success: '#10B981', // from --color-feedback-success
      successText: '#047857', // from --color-feedback-success-text
      successHover: '#059669', // from --color-feedback-success-hover
      successBorder: '#6EE7B7', // from --color-feedback-success-border
      error: '#EF4444', // from --color-feedback-error
      errorText: '#B91C1C', // from --color-feedback-error-text
      errorBorder: '#DC2626', // from --color-feedback-error-border
      warning: '#F59E0B', // from --color-feedback-warning
      warningText: '#B45309', // from --color-feedback-warning-text
      warningBorder: '#D97706', // from --color-feedback-warning-border
      info: '#3B82F6', // from --color-feedback-info
      infoText: '#1D4ED8', // from --color-feedback-info-text
      infoBg: '#DBEAFE', // from --color-feedback-info-bg
      infoBorder: '#93C5FD', // from --color-feedback-info-border
    },
    highlight: '#ffeb3b', // from --color-highlight
    overlay: 'rgba(0, 0, 0, 0.5)', // from --color-overlay

    // Raw gray palette (from original JS tokens, aligns with Tailwind's gray)
    gray: {
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    // This gradient is specific to JS tokens and not in tokens.css
    gradientPrimary: 'linear-gradient(90deg, #1E40AF, #9333EA)',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, sans-serif', // from --font-sans
      heading: 'Poppins, sans-serif', // from --font-heading
      serif: 'Poppins, sans-serif', // Assuming Poppins is also the serif, or define another
    },
    fontSize: {
      xs: '0.875rem', // from --font-size-xs (using max value of clamp for simplicity)
      sm: '1rem',     // from --font-size-sm
      base: '1.125rem',// from --font-size-base
      md: '1.25rem',  // from --font-size-md
      lg: '1.5rem',   // from --font-size-lg
      xl: '1.875rem', // from --font-size-xl
      '2xl': '2.25rem',// from --font-size-2xl
      '3xl': '3rem',   // from --font-size-3xl
      '4xl': '3.75rem',// from --font-size-4xl
      '5xl': '4.5rem', // from --font-size-5xl
      '6xl': '5.25rem',// from --font-size-6xl
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.2',    // from --line-height-tight
      snug: '1.375',  // from --line-height-snug
      normal: '1.5',   // from --line-height-normal
      relaxed: '1.625',// from --line-height-relaxed
      loose: '2',     // from --line-height-loose
      // Original JS values:
      // tight: '1.25',
      // relaxed: '1.75',
    },
    letterSpacing: { // Matches tokens.css
      tight: '1.25',
      relaxed: '1.75',
    },
  },
  spacing: {
    space0: '0px',      // from --space-0
    spaceXs: '0.5rem',  // from --space-xs (using max value of clamp)
    spaceSm: '0.75rem', // from --space-sm
    spaceMd: '1.25rem', // from --space-md
    spaceLg: '2rem',    // from --space-lg
    spaceXl: '2.5rem',  // from --space-xl
    space2xl: '3rem',   // from --space-2xl
    space3xl: '4rem',   // from --space-3xl
    space4xl: '5rem',   // from --space-4xl
    space5xl: '6rem',   // from --space-5xl
    space6xl: '7rem',   // from --space-6xl
  },
  borderRadius: {
    radiusNone: '0',        // Added for completeness
    radiusSm: '0.25rem',    // from --radius-sm
    radiusMd: '0.375rem',   // from --radius-md
    radiusLg: '0.5rem',     // from --radius-lg
    radiusXl: '0.75rem',    // from --radius-xl
    radius2xl: '1rem',      // from --radius-2xl
    radiusFull: '9999px',   // from --radius-full
  },
  shadows: {
    // Reflecting --shadow-sm to --shadow-2xl from tokens.css (using the --shadow-color variable concept)
    // For JS, we'd typically define the full string.
    // Assuming --shadow-color is 'rgba(0, 0, 0, 0.1)' for light mode
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
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
  durations: {
    fast: '150ms',
    default: '300ms',
    slow: '500ms',
  },
  timingFunctions: { // Easings
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  },
  focus: {
    focusRingColor: '#3B82F6', // from --color-focus-ring (light mode)
  },
};

export default tokens;
