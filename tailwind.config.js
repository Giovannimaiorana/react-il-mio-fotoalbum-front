/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'league': ['League', 'sans-serif'],
        'sanchez': ['Sanchez', 'sans-serif'],
      },
      colors: {
        primary: 'rgb(25, 43, 50)', 
        overlay: 'rgba(62, 78, 86)'    
      },
    },
  },
  plugins: [],
}

