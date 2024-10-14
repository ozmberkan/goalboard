/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        base: "#3A5ADB",
        baseDark: "#040948",
        bgDark: "#202020",
      },
      backgroundImage: {
        "banner-hero": "url('/src/assets/Banners/parabolic.svg')",
        noise: "url('/src/assets/noise.svg')",
      },
    },
  },
  plugins: [],
};
