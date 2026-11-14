/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#050505',
          surface: '#111315',
          card: '#181a1b',
          border: '#33373d',
          red: '#d71920',
          blue: '#113f88',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'Impact', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
