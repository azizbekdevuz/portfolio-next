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
        primary: "#149ddd",
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
          primary: "#272829",
          secondary: "#6f7180",
          light: "#fff",
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
