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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#2D1B69",
          dark: "#1F1147",
          light: "#3F2B7F",
        },
        accent: {
          DEFAULT: "#C084FC",
          glow: "#E879F9",
        },
        surface: {
          DEFAULT: "#1A1A2E",
          hover: "#232347",
          glass: "rgba(26, 26, 46, 0.8)",
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
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(192, 132, 252, 0.3)",
        "glow-strong": "0 0 40px rgba(192, 132, 252, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
