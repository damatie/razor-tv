import type { Config } from "tailwindcss";
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0B0B0F",
          soft: "#15151E",
          primary: "#C98C30",
          text: "#F5F7FA",
          sub: "#9BA3AF",
        },
      },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,.35)" },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: { shimmer: "shimmer 2s linear infinite" },
    },
  },
  plugins: [],
} satisfies Config;
