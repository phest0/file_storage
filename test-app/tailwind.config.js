/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#0A2342",
        customGreen: "#2CA58D",
        customGreen2: "#84BC9C",
        customPink: "#F46197",
      },
    },
  },
  plugins: [],
};
