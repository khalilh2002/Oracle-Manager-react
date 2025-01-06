/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'oracle-red': '#C74634',
        'oracle-dark-red': '#A23B2A',
        'oracle-black': '#312D2A',
        'oracle-gray': '#3A3632',
      },
      fontFamily: {
        'oracle': ['Oracle Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

