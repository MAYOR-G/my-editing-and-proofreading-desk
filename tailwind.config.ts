import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#11110f",
        charcoal: "#24221e",
        paper: "#f8f4ec",
        ivory: "#fffdf7",
        linen: "#eee6da",
        gold: "#b08a3c",
        "gold-deep": "#7b6026",
        mist: "#d8d1c6",
        /* Semantic status colors */
        status: {
          success: "#16a34a",
          "success-light": "rgba(22, 163, 74, 0.10)",
          warning: "#d97706",
          "warning-light": "rgba(217, 119, 6, 0.10)",
          info: "#2563eb",
          "info-light": "rgba(37, 99, 235, 0.10)",
          danger: "#dc2626",
          "danger-light": "rgba(220, 38, 38, 0.10)"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        "soft-border": "0 1px 0 rgba(17, 17, 15, 0.08)",
        "card-hover": "0 30px 100px rgba(17, 17, 15, 0.10)",
        "gold-glow": "0 0 24px rgba(176, 138, 60, 0.12)"
      },
      transitionTimingFunction: {
        "premium-out": "cubic-bezier(0.23, 1, 0.32, 1)",
        "premium-in-out": "cubic-bezier(0.77, 0, 0.175, 1)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--accordion-height)", opacity: "1" }
        },
        "accordion-up": {
          from: { height: "var(--accordion-height)", opacity: "1" },
          to: { height: "0", opacity: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
        "accordion-up": "accordion-up 0.25s cubic-bezier(0.23, 1, 0.32, 1)"
      }
    }
  },
  plugins: []
};

export default config;
