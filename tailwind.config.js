/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6", // Tailwind utilities use karne ke liye default theme setup
        "text-primary": "#1f2937",
        accent: "#0d9488",
      },
    },
  },
  plugins: [],
}

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        dancing: ['Dancing Script', 'cursive'],
        biryani: ['Biryani', 'sans-serif'],
      },
    },
  },
};