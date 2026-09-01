import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["EB Garamond", "serif"],
        sans: ["Hanken Grotesk", "sans-serif"],
      },
      colors: {
        primary: "#000000",
        secondary: "#9B8B5C",
        background: "#FAFAF8",
        border: "#E5E5E5",
      },
      spacing: {
        gutter: "32px",
      },
    },
  },
  plugins: [],
};

export default config;
