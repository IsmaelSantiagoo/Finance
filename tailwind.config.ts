import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Ou 'media', depende de como quer ativar o dark mode
  theme: {
    extend: {
      colors: {
        projectPallet: {
          primary: '#141332',
          secondary: '#6359E9',
          tertiary: '#4B4B99',
          quaternary: '#1D1D41',
        },
      },
    },
  },
  plugins: [],
};

export default config;
