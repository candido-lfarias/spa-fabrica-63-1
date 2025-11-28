/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"JetBrains Mono"', "monospace"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};

// tailwind.config.js (apenas se quiser)
module.exports = {
  theme: {
    extend: {
      colors: {
        brown: {
          700: '#7a3f2a',
        },
        // ... adicione outros tons se necessário
      },
    },
  },
  plugins: [],
}
