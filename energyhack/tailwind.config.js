/** @type {import('tailwindcss').Config } */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette1: '#DAD7CD',
        palette2: '#A3B18A',
        palette3: '#588157',
        palette4: '#3A5A40',
        palette5: '#344E41'
      },
      fontFamily: {
        instrument: ['Instrument Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

