/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Josefin Slab"', ...defaultTheme.fontFamily.serif],
      },
    },
    fontSize: {
      12: ["12px", "12px"],
      16: ["16px", "16px"],
      18: ["18px", "18px"],
      20: ["20px", "20px"],
      32: ["32px", "32px"],
    },
    spacing: {
      5: "5px",
      10: "10px",
      15: "15px",
      20: "20px",
      25: "25px",
      30: "30px",
      35: "35px",
      40: "40px",
    },
  },
  plugins: [],
};
