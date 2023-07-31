/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "Marine-blue": "hsl(213, 96%, 18%)",
          "Purplish-blue": "hsl(243, 100%, 62%)",
          "Pastel-blue": "hsl(228, 100%, 84%)",
          "Light-blue": "hsl(206, 94%, 87%)",
          "Strawberry-red": "hsl(354, 84%, 57%)",
        },
        neutral: {
          "Cool-gray": "hsl(231, 11%, 63%)",
          "Light-gray": "hsl(229, 24%, 87%)",
          Magnolia: "hsl(217, 100%, 97%)",
          Alabaster: "hsl(231, 100%, 99%)",
        },
      },
    },
    fontFamily: {
      Ubuntu: ["Ubuntu", "sans-serif"],
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
};
