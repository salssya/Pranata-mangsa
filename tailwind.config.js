/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f3ee',
          100: '#d1e7dd',
          200: '#a3cfbb',
          300: '#75b798',
          400: '#479f76',
          500: '#2E7D32', // Main primary color
          600: '#25642a',
          700: '#1c4b20',
          800: '#133215',
          900: '#09190b',
        },
        secondary: {
          50: '#edf4fa',
          100: '#dbeaf5',
          200: '#b7d5eb',
          300: '#93c0e0',
          400: '#6fabd6',
          500: '#1565C0', // Main secondary color
          600: '#1151a0',
          700: '#0d3d7f',
          800: '#09295f',
          900: '#04143f',
        },
        earth: {
          50: '#f5f0ee',
          100: '#ebe2dd',
          200: '#d7c5bc',
          300: '#c3a99a',
          400: '#af8c79',
          500: '#795548', // Main earth color
          600: '#61443a',
          700: '#49332b',
          800: '#30221d',
          900: '#18110e',
        },
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Merriweather"', 'serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};