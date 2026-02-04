/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "system-ui", "sans-serif"],
      },
    },
  },
};
