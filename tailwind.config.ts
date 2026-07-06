import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondo profundo con matiz "agua"
        ink: {
          DEFAULT: "#0a0e14",
          800: "#0d1219",
          700: "#111823",
          600: "#16202e",
          500: "#1d2b3c",
        },
        // Acento koi (naranja-coral)
        koi: {
          DEFAULT: "#ff6a3d",
          light: "#ff8a5c",
          deep: "#f0492b",
        },
        // Agua / secundario
        water: {
          DEFAULT: "#2dd4bf",
          deep: "#0f766e",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -30px) scale(1.08)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blob: "blob 14s ease-in-out infinite",
        shimmer: "shimmer 6s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
