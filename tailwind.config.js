/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,html}"],
  plugins: [require('tailwindcss-font-inter')]
}