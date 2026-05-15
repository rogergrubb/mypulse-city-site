import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#05060d",
          alt: "#0a0d1a",
          card: "#0d1020",
        },
        pulse: {
          flame: "#ff6b35",
          rose: "#ff3d7f",
          gold: "#fcd34d",
          mint: "#10b981",
          cyan: "#06b6d4",
          violet: "#a855f7",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["SF Mono", "Menlo", "Consolas", "monospace"],
      },
      backgroundImage: {
        "pulse-grad":
          "linear-gradient(90deg, #fcd34d 0%, #ff6b35 50%, #ff3d7f 100%)",
        "flame-grad": "linear-gradient(90deg, #ff6b35, #ff3d7f)",
      },
    },
  },
  plugins: [],
};

export default config;
