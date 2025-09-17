/**  @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffb6c1",     // Light pink
        secondary: "#ffc0cb",   // Pink
        accent: "#ffe4e1",      // Very soft pink
      },
    },
  },
  plugins: [],
};
