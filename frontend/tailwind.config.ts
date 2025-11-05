import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0F0F23",
          secondary: "#16213E",
          tertiary: "#1A1A2E",
        },
        foreground: "#E5E7EB",
        primary: {
          DEFAULT: "#2D1B69",
          dark: "#1F1147",
          light: "#3F2B7F",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#2D1B69",
          700: "#1F1147",
          800: "#1E1B4B",
          900: "#312E81",
        },
        accent: {
          DEFAULT: "#C084FC",
          glow: "#E879F9",
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A855F7",
          600: "#9333EA",
          700: "#7C3AED",
          800: "#6B21A8",
          900: "#581C87",
        },
        surface: {
          DEFAULT: "#1A1A2E",
          hover: "#232347",
          glass: "rgba(26, 26, 46, 0.8)",
          elevated: "#2A2A4E",
        },
        border: {
          DEFAULT: "#2D2D4A",
          light: "#404066",
          glow: "rgba(192, 132, 252, 0.3)",
        },
        text: {
          primary: "#E5E7EB",
          secondary: "#9CA3AF",
          muted: "#6B7280",
          accent: "#C084FC",
          success: "#10B981",
          danger: "#EF4444",
        },
        success: {
          DEFAULT: "#10B981",
          dark: "#047857",
          light: "#34D399",
        },
        danger: {
          DEFAULT: "#EF4444",
          dark: "#DC2626",
          light: "#F87171",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(192, 132, 252, 0.3)",
        "glow-strong": "0 0 40px rgba(192, 132, 252, 0.5)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite alternate",
        "slide-in": "slide-in 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%": { boxShadow: "0 0 20px rgba(192, 132, 252, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(192, 132, 252, 0.6)" },
        },
        "slide-in": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
