import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- Paleta "Sumi & Marea" (temática vía CSS vars) --------------
        // Los tokens cambian entre claro/oscuro por su rol semántico:
        // sumi = fondo · laguna = superficie · vidrio = borde
        // niebla = texto · junco = texto atenuado
        sumi: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          900: "rgb(var(--bg-900) / <alpha-value>)",
          800: "rgb(var(--bg-800) / <alpha-value>)",
        },
        laguna: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          700: "rgb(var(--surface-700) / <alpha-value>)",
        },
        vidrio: "rgb(var(--line) / <alpha-value>)",
        indigo: {
          DEFAULT: "rgb(var(--indigo) / <alpha-value>)",
          light: "rgb(var(--indigo-light) / <alpha-value>)",
        },
        koi: {
          DEFAULT: "rgb(var(--koi) / <alpha-value>)",
          light: "rgb(var(--koi-light) / <alpha-value>)",
          deep: "rgb(var(--koi-deep) / <alpha-value>)",
        },
        water: "rgb(var(--water) / <alpha-value>)",
        niebla: "rgb(var(--text) / <alpha-value>)",
        junco: "rgb(var(--muted) / <alpha-value>)",
        // Superposiciones temáticas (reemplazan a white/x)
        hair: "rgb(var(--hair) / <alpha-value>)",
        veil: "rgb(var(--veil) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(0.6deg)" },
        },
      },
      animation: {
        drift: "drift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
