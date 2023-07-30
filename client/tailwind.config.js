/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'rick&morty': "url('/rick&morty.jpg')",
      }
    },
  },
  plugins: [],
}

