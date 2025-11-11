import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Activa el modo oscuro por clase (necesario para tu botón de tema)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Indica a Tailwind dónde buscar clases CSS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;



