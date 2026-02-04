/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "system-ui", "sans-serif"],
      },
      animation: {
        scaleIn: "scaleIn 0.6s ease-out forwards",
        checkDraw: "checkDraw 0.8s ease-out forwards",
      },
      keyframes: {
        scaleIn: {
          "0%": { transform: "scale(0.4)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        checkDraw: {
          "0%": { strokeDasharray: "100", strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
};
