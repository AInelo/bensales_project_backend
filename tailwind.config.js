/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background_primary: "#FFFFFF",
        backgroung_secondary: "#F4F4F4",
        texte_secondary: "#252525",
      },
      fontFamily: {
        ubuntu: ['"Ubuntu Sans"'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {

      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}

