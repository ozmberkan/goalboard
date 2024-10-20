/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#3A5ADB",
        primaryDark: "#040948",
      },
      backgroundImage: {
        "auth-bg": "url('~/assets/Auth/bg.svg')",
      },
    },
  },
  plugins: [],
};
