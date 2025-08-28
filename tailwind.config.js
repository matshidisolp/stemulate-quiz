/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        fontFamily: {
            chelsea: ['"Chelsea Market"', "cursive"], // App custom font
        },
        colors: {
            brandOlive: "#BBB490",  //background color
        },
    },
  },
  plugins: [],
};