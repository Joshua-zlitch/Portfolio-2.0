/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        spaceBlack: "#04020a",
        spaceDark: "#0c081e",
        cyberCyan: "#00f0ff",
        cyberPurple: "#a855f7",
        cyberPink: "#ec4899",
        textLight: "#f3f4f6",
        textMuted: "#9ca3af",
      },
      fontFamily: {
        heading: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        cyanGlow: "0 0 20px rgba(0, 240, 255, 0.25)",
        purpleGlow: "0 0 20px rgba(168, 85, 247, 0.25)",
        pinkGlow: "0 0 20px rgba(236, 72, 153, 0.25)",
      },
    },
  },
  plugins: [],
}
