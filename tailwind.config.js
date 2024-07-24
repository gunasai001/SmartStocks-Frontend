/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-ribbon': {
        '50': '#f4f4fb',
        '100': '#e8e8f6',
        '200': '#cccdeb',
        '300': '#9fa4da',
        '400': '#6c74c4',
        '500': '#4952ae',
        '600': '#373c92',
        '700': '#2d3177',
        '800': '#292c63',
        '900': '#262754',
        '950': '#0b0b18',
    },
    
      },
    },
  },
  plugins: [],
}