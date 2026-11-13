import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.{mdx,json}", "./lib/**/*.ts"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        navy: { DEFAULT: "#0E1F3D", 700: "#16294B", 600: "#1F3459" },
        amber: { DEFAULT: "#FFB020", 600: "#E89A00" },
        cream: { DEFAULT: "#F5E6C8", 600: "#E3CFA6" },
        night: "#081428",
        slate: { DEFAULT: "#5B6475", 300: "#A7AFBF" },
        mist: "#F6F7F9",
        line: "#E3E6EC",
      },
      fontFamily: {
        display: ["var(--font-unbounded)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "12px" },
      letterSpacing: { display: "-0.02em", eyebrow: "0.2em" },
      maxWidth: { prose: "68ch" },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: { "fade-up": "fade-up .7s cubic-bezier(.2,.7,.2,1) both" },
    },
  },
  plugins: [],
};
export default config;
