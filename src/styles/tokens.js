// Design Tokens

const tokens = {
  colors: {
    primary: '#1E40AF', // Blue
    secondary: '#9333EA', // Purple
    success: '#10B981', // Green
    error: '#EF4444', // Red
    warning: '#F59E0B', // Yellow
    neutral: {
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
    primaryHover: '#1D4ED8',
    primaryActive: '#1E3A8A',
    gradientPrimary: 'linear-gradient(90deg, #1E40AF, #9333EA)',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.25',
      relaxed: '1.75',
    },
    letterSpacing: {
      tight: '-0.05em',
      wide: '0.05em',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
    '3xl': '48px',
  },
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.15)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.2)',
  },
  opacity: {
    opacity50: '0.5',
    opacity75: '0.75',
    opacity90: '0.9',
  },
  zIndex: {
    zIndexModal: 1000,
    zIndexDropdown: 1050,
    zIndexTooltip: 1100,
  },
};

export default tokens;
