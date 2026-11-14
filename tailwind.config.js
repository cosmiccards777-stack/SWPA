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
          dark: '#0a0b0e',
          surface: '#12141a',
          card: '#181b22',
          border: '#242934',
          accent: '#e5a93b', // luxurious warm amber/gold
          accentHover: '#f5ba4d',
          red: '#dc2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Barlow Condensed', 'Impact', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
