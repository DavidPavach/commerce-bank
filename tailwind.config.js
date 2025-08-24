/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
      colors: {
        primary: "#1D9B5E",
        goldenYellow: "#FFDF00",
        primaryYellow: "#fdff81",
        blueBlack: "#080200",
        black: "#000000",
        lightBlack: "#0D0D0D",
        accent: "#F57C00",
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          500: "#6B7280",
          600: "#4B5563",
        },
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(180deg, #FAF9F6 0%, #1D9B5E 100%)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
