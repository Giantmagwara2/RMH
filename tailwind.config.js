// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './RMH-Replit/**/*.{js,jsx,ts,tsx}',
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
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      fontWeight: {
        extralight: '200',
        light: '300',
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
          primary: {
            DEFAULT: '#2563EB', // Blue-600 (Example: Same for light/dark or define a dark variant)
            dark: '#3B82F6',    // Blue-500 (Example: Lighter for dark mode)
          },
          secondary: {
            DEFAULT: '#1E40AF', // Blue-800
            dark: '#2563EB',    // Blue-600
          },
          accent: {
            DEFAULT: '#F59E0B', // Amber-500
            dark: '#FBBF24',    // Amber-400
          },
        },
        neutrals: {
          background: '#F3F4F6',
          'background-dark': '#111827', // Dark Gray/Blue for dark mode background
          surface: '#F3F4F6',
          'surface-dark': '#1F2937',    // Slightly lighter dark for surfaces
          border: '#E5E7EB',
          'border-dark': '#374151',      // Darker gray for borders in dark mode
          textPrimary: '#111827',
          'textPrimary-dark': '#F3F4F6', // Light gray/off-white for dark mode primary text
          textSecondary: '#4B5563',
          'textSecondary-dark': '#9CA3AF',// Medium light gray for dark mode secondary text
          muted: '#9CA3AF',
          'muted-dark': '#6B7280',        // Darker light gray for dark mode muted text
        },
        semantic: {
          success: '#10B981',
          error: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
          // Consider dark variants if needed, e.g., success-dark: '#34D399'
        },
        // Define the custom colors used in your components
        'electric-blue': '#007BFF', // Example: A bright blue
        'midnight-blue': '#191970', // Example: A very dark blue (good for light mode text)
        'soft-white': '#F8F8FF',    // Example: An off-white (good for dark mode text or light bg)
        primary: '#1E40AF',
        primaryHover: '#1D4ED8',
        primaryActive: '#1E3A8A',
        gradientPrimary: 'linear-gradient(90deg, #1E40AF, #9333EA)',
        'highlight-yellow': '#FFD700', // Bright yellow for dark mode highlights
        secondary: '#9333EA', // Purple
        accent: '#F59E0B', // Amber
        foreground: '#1F2937', // Dark gray
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
        soft: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        DEFAULT: '300ms',
        fast: '150ms',
        slow: '500ms',
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
