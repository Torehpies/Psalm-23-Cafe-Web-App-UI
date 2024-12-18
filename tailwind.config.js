/** @type {import('tailwindcss').Config} */
module.exports = {
content: ["./src/**/*.{html,js}"],
theme: {
  extend: {
    fontFamily: {
      sans: ['Figtree', 'sans-serif'],
    },
    backgroundImage: {
      'cafe-bg': "url('/assets/yellowcafe.jpg')", // Update the path to your image
    },
  },
},
plugins: [],
}