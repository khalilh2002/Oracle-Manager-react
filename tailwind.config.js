/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'oracle-red': '#f80000',
        'oracle-dark-red': '#b80000'
      },
      fontFamily: {
        'oracle': ['Oracle Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

