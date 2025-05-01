// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enable toggling via a .dark class on <html>
  safelist: [
    // dynamic classes generated in JS
    'text-electric-blue',
    'bg-electric-blue',
    'border-electric-blue',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        'electric-blue': '#3490dc',
        'midnight-blue': '#2c3e50',
        'rich-black': '#0c0c0c',
        'highlight-yellow': '#ffc72c',
        'soft-white': '#f9f9f9',
        'brand-red': '#ff4c4c',
        'brand-green': '#00d084',
      },
      fontFamily: {
        // Custom and Google fonts
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Poppins', ...defaultTheme.fontFamily.sans],
        body: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        // Custom spacing tokens
        section: '5rem',
        header: '4rem',
      },
      boxShadow: {
        // Semantic shadows
        card: '0 10px 15px rgba(0, 0, 0, 0.08)',
        header: '0 2px 10px rgba(0, 0, 0, 0.1)',
        glow: '0 0 10px rgba(52, 144, 220, 0.5)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideDown: 'slideDown 0.4s ease-out',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'group-hover', 'dark'],
      textColor: ['active', 'group-hover', 'dark'],
      borderColor: ['focus', 'dark'],
      scale: ['group-hover'],
      ringColor: ['focus', 'dark'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),       // better default form styles
    require('@tailwindcss/typography'),  // prose classes for rich text
    require('@tailwindcss/aspect-ratio'),// aspect-ratio utilities
  ],
};
