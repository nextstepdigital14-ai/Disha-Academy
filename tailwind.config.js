/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#dbe7f4',
          200: '#b8d2ea',
          300: '#85b3dc',
          400: '#4e8fcb',
          500: '#2b72b8',
          600: '#1e5999',
          700: '#1a477d',
          800: '#173c68',
          900: '#0a192f',
          950: '#060e1d',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px -5px rgba(10, 25, 47, 0.08), 0 4px 10px -2px rgba(10, 25, 47, 0.03)',
        'glow': '0 0 25px -5px rgba(37, 99, 235, 0.3)',
      }
    },
  },
  plugins: [],
}
