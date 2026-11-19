import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        velvet: {
          1: "#8e1d1f",
          2: "#62101a",
          3: "#3f0a0e",
          4: "#270507",
        },
        gold: {
          DEFAULT: "#c8973e",
          lt: "#e8c57a",
          pale: "#f6e4b4",
          dk: "#8a5e17",
        },
        parch: {
          DEFAULT: "#f7eacf",
          2: "#eedbb4",
        },
        card: "#fff9ec",
        ink: {
          DEFAULT: "#47130f",
          2: "#6e3024",
          3: "#946650",
        },
        cream: {
          DEFAULT: "#fbf0da",
          2: "#e9d3ae",
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        crimson: ['"Crimson Pro"', 'Georgia', 'serif'],
        josefin: ['"Josefin Sans"', 'sans-serif'],
        greatvibes: ['"Great Vibes"', 'cursive'],
        devanagari: ['"Noto Serif Devanagari"', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;

