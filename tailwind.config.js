/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4ADE80", // A "dew-inspired" green
        secondary: "#6EE7B7",
        accent: "#FBBF24", // A warm, sunny yellow
      },
    }
  },
  plugins: [],
}