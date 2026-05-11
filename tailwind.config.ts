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
        // New Palette
        primary: {
          DEFAULT: "#174a7c",
          active: "#123b63",
          light: "#256aa8",
        },
        cta: {
          DEFAULT: "#1f8f5a",
          active: "#176f47",
          soft: "#e8f6ef",
        },
        canvas: "#ffffff",
        surface: {
          soft: "#f7f7f7",
          strong: "#eef0f3",
        },
        ink: "#0a0b0d",
        body: "#5b616e",
        muted: "#7c828a",
        dark: {
          surface: "#0a0b0d",
          elevated: "#16181c",
        },
        hairline: "#dee1e6",
        
        // Legacy Aliases
        charcoal: "#5b616e",
        paper: "#f7f7f7",
        ivory: "#ffffff",
        linen: "#eef0f3",
        gold: "#174a7c",
        "gold-deep": "#123b63",
        mist: "#dee1e6",
        accent: {
          DEFAULT: "#174a7c",
          light: "#256aa8",
        },
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
