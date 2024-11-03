/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      fontWeight: {
        reg: 400,
        med: 500,
        bld: 700,
      },
      colors: {
        'dark-gray': '#222222',
        'very-dark-gray': '#1a1a1a',
      },
      fontSize: {
        copy: '18px',
      },
    },
  },
  plugins: [],
};
