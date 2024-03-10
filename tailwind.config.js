/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-background': '#182128',
        'color-aqua': '#00ffff',
      }
    },
  },
  plugins: [],
}

