import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E07A5F', // Warm Terracotta
        secondary: '#EAE0CB', // Soft Beige
        accent: '#3D405B', // Muted Teal
        background: '#F2E8D8', // Warm Cream
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Nunito', 'sans-serif'],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
}

export default config;
