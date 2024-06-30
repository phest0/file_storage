// tailwind.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background: "#74dfa2", // or DEFAULT
            foreground: "#74dfa2", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#74dfa2",
              DEFAULT: "#74dfa2",
            },
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
};
