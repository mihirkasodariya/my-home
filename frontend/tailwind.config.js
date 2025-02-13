/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"], 
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],

      },
    },
  },
  plugins: [
   
  ],
};
