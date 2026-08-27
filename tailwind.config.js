/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a8a',
          light: '#2563eb',
          dark: '#1e293b',
        },
        accent: {
          red: '#dc2626',
          green: '#16a34a',
        },
      },
    },
  },
  plugins: [],
}
