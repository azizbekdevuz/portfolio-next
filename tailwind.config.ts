import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /** Semantic — maps to CSS variables in theme-tokens.css */
        page: "var(--color-page)",
        "page-elevated": "var(--color-page-elevated)",
        card: "var(--color-card)",
        "card-muted": "var(--color-card-muted)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        fg: "var(--color-fg)",
        muted: "var(--color-fg-muted)",
        subtle: "var(--color-fg-subtle)",
        accent: "var(--color-accent)",
        "accent-dim": "var(--color-accent-dim)",
        "accent-fg": "var(--color-accent-fg)",
        "surface-soft": "var(--color-surface-soft)",
        /** Alias legacy `primary` to theme accent */
        primary: "var(--color-accent)",
        secondary: "#173b6c",
        dark: {
          DEFAULT: "#040b14",
          light: "#2c2f3f",
        },
        light: {
          DEFAULT: "#ffffff",
          dark: "#f5f8fd",
        },
        text: {
          primary: "var(--color-fg)",
          secondary: "var(--color-fg-muted)",
          light: "var(--color-fg)",
        },
      },
      animation: {
        noise: "noise 8s steps(8) infinite",
      },
      keyframes: {
        noise: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -5%)" },
          "20%": { transform: "translate(-10%, 5%)" },
          "30%": { transform: "translate(5%, -10%)" },
          "40%": { transform: "translate(-5%, 15%)" },
          "50%": { transform: "translate(-10%, 5%)" },
          "60%": { transform: "translate(15%, 0)" },
          "70%": { transform: "translate(0, 10%)" },
          "80%": { transform: "translate(-15%, 0)" },
          "90%": { transform: "translate(10%, 5%)" },
        },
      },
      fontFamily: {
        sans: ["var(--font-open-sans)"],
        heading: ["var(--font-raleway)"],
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
};

export default config;
