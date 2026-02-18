/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // for Vite
    "./pages/**/*.{js,jsx}",
    "./sub-pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // for React source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
