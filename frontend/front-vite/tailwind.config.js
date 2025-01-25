/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-beige": "#F0E5CF",
        "secondary-beige":"#FEF5E2",
        "text-brown":"#D08E70",
        "main-brown": "#975B0E",
        "main-grey": "#9F9F9F",
        "links-blue": "#4285F4"
      },
      screens: {
        'custom-screen': '800px', 
      },
    },
  },
  plugins: [],
}

