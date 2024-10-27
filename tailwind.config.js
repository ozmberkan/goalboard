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
        darkPrimary: "#161618",
        darkBox: "#1C1C1F",
        darkBorder: "#262626",
        darkText: "#737373",
      },
      dropShadow: {
        custom: "0px 4px 100px #3a5adb",
      },
      backgroundImage: {
        "auth-bg": "url('~/assets/Auth/bg.svg')",
        "pricing-bg": "url('~/assets/Pricing.svg')",
        "team-bg": "url('~/assets/TeamBG.svg')",
        "team-dark-bg": "url('~/assets/TeamDarkBG.svg')",
        "project-bg": "url('~/assets/ProjectBG.svg')",
        "project-dark-bg": "url('~/assets/ProjectDarkBG.svg')",
        "card-bg": "url('~/assets/CreditCard.svg')",
        "card-gold-bg": "url('~/assets/GoldCreditCard.svg')",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
